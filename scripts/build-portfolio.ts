import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const SOURCE_ROOT = "./portfolio work";
const PHOTOGRAPHY_DIR = path.join(SOURCE_ROOT, "Photography");
const THUMBNAILS_DIR = path.join(SOURCE_ROOT, "Thumbnails");
const PUBLIC_DIR = "./public/portfolio";
const MANIFEST_PATH = "./src/portfolio/manifest.json";

// Full-res source photos are 5000-6000px / up to ~10MB each. Frames on the
// canvas are tiny, so we downscale the longest edge and re-encode via the
// dwebp/cwebp CLI pair (libwebp's own tools — more reliably available than
// an ffmpeg build with libwebp compiled in). This cuts the served payload
// down substantially and shrinks GPU texture memory. Aspect ratio is
// preserved, so manifest width/height (used only as a ratio in scene.tsx)
// stays correct.
const MAX_EDGE = 1100;
const WEBP_QUALITY = 76;

function resizeWebp(srcBuf: Buffer, dest: string): { width: number; height: number } {
  const { width, height } = readWebpSize(srcBuf);
  const longEdge = Math.max(width, height);

  if (longEdge <= MAX_EDGE) {
    fs.writeFileSync(dest, srcBuf);
    return { width, height };
  }

  const ratio = MAX_EDGE / longEdge;
  const targetWidth = Math.round(width * ratio);
  const targetHeight = Math.round(height * ratio);

  const png = execFileSync("dwebp", ["-o", "-", "--", "-"], { input: srcBuf, maxBuffer: 1024 * 1024 * 256 });
  execFileSync(
    "cwebp",
    ["-quiet", "-q", String(WEBP_QUALITY), "-resize", String(targetWidth), String(targetHeight), "-o", dest, "--", "-"],
    { input: png, maxBuffer: 1024 * 1024 * 256 }
  );

  return { width: targetWidth, height: targetHeight };
}

type ManifestItem = {
  url: string;
  width: number;
  height: number;
};

const slug = (s: string): string =>
  s
    .toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function walkWebp(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkWebp(full));
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".webp")) out.push(full);
  }
  return out;
}

// Minimal WebP dimension reader (VP8 / VP8L / VP8X) so the script stays portable.
function readWebpSize(buf: Buffer): { width: number; height: number } {
  const fourcc = buf.toString("ascii", 12, 16);
  if (fourcc === "VP8 ") {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fourcc === "VP8L") {
    const bits = (buf[21] | (buf[22] << 8) | (buf[23] << 16) | (buf[24] << 24)) >>> 0;
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (fourcc === "VP8X") {
    return {
      width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
      height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
    };
  }
  throw new Error(`Unsupported WebP variant: ${fourcc}`);
}

// Deterministic shuffle (mulberry32) so projects interleave on the canvas but the build is reproducible.
function shuffle<T>(arr: T[], seed: number): T[] {
  let a = seed >>> 0;
  const rng = () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type Source = { file: string; group: string };

function collectSources(): Source[] {
  const sources: Source[] = [];

  for (const project of fs.readdirSync(PHOTOGRAPHY_DIR, { withFileTypes: true })) {
    if (!project.isDirectory()) continue;
    const group = slug(project.name);
    for (const file of walkWebp(path.join(PHOTOGRAPHY_DIR, project.name))) {
      sources.push({ file, group });
    }
  }

  for (const file of walkWebp(THUMBNAILS_DIR)) {
    sources.push({ file, group: "thumbnails" });
  }

  return sources;
}

function main() {
  fs.rmSync(PUBLIC_DIR, { recursive: true, force: true });

  const sources = collectSources();
  const manifest: ManifestItem[] = [];
  const usedNames = new Set<string>();
  const skipped: string[] = [];

  for (const { file, group } of sources) {
    const buf = fs.readFileSync(file);

    if (buf.length === 0) {
      skipped.push(`${file} (empty file)`);
      continue;
    }

    const groupDir = path.join(PUBLIC_DIR, group);
    fs.mkdirSync(groupDir, { recursive: true });

    let name = slug(path.basename(file));
    let unique = `${group}/${name}`;
    let n = 2;
    while (usedNames.has(unique)) {
      name = `${slug(path.basename(file))}-${n++}`;
      unique = `${group}/${name}`;
    }
    usedNames.add(unique);

    let size: { width: number; height: number };
    try {
      size = resizeWebp(buf, path.join(groupDir, `${name}.webp`));
    } catch (err) {
      skipped.push(`${file} (${(err as Error).message})`);
      continue;
    }

    manifest.push({ url: `portfolio/${group}/${name}.webp`, width: size.width, height: size.height });
  }

  const shuffled = shuffle(manifest, 1729);

  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(shuffled, null, 2)}\n`);

  console.log(`Copied ${manifest.length} images → ${PUBLIC_DIR}`);
  console.log(`Wrote manifest → ${MANIFEST_PATH}`);
  if (skipped.length) {
    console.log(`Skipped ${skipped.length} unreadable file(s):`);
    for (const s of skipped) console.log(`  - ${s}`);
  }
}

main();
