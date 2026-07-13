import * as React from "react";
import { CATEGORIES } from "~/src/frame/categories";
import type { MediaItem } from "~/src/infinite-canvas/types";
import { Lightbox } from "./lightbox";
import styles from "./style.module.css";

const ALBUM_STAGGER_CAP = 24;
const ALBUM_STAGGER_MS = 40;

const COLUMN_BREAKPOINTS = [
  { query: "(min-width: 70em)", count: 4 },
  { query: "(min-width: 40em)", count: 3 },
] as const;

const getColumnCount = (): number => {
  for (const { query, count } of COLUMN_BREAKPOINTS) {
    if (window.matchMedia(query).matches) {
      return count;
    }
  }
  return 2;
};

function useColumnCount(): number {
  const [count, setCount] = React.useState(getColumnCount);

  React.useEffect(() => {
    const mediaQueries = COLUMN_BREAKPOINTS.map(({ query }) => window.matchMedia(query));
    const onChange = () => setCount(getColumnCount());
    for (const mq of mediaQueries) {
      mq.addEventListener("change", onChange);
    }
    return () => {
      for (const mq of mediaQueries) {
        mq.removeEventListener("change", onChange);
      }
    };
  }, []);

  return count;
}

type IndexedMediaItem = MediaItem & { index: number };

function distributeIntoColumns(photos: MediaItem[], columnCount: number): IndexedMediaItem[][] {
  const columns: { items: IndexedMediaItem[]; height: number }[] = Array.from({ length: columnCount }, () => ({
    items: [],
    height: 0,
  }));

  photos.forEach((photo, index) => {
    const shortest = columns.reduce((shortestSoFar, column) => (column.height < shortestSoFar.height ? column : shortestSoFar));
    shortest.items.push({ ...photo, index });
    shortest.height += photo.height / photo.width;
  });

  return columns.map((column) => column.items);
}

type GalleryProps = {
  slug: string;
  media: MediaItem[];
};

export function Gallery({ slug, media }: GalleryProps) {
  const category = CATEGORIES.find((c) => c.slug === slug);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const columnCount = useColumnCount();

  const photos = React.useMemo(() => media.filter((item) => item.url.startsWith(`portfolio/${slug}/`)), [media, slug]);
  const columns = React.useMemo(() => distributeIntoColumns(photos, columnCount), [photos, columnCount]);

  React.useEffect(() => {
    setLightboxIndex(null);
  }, [slug]);

  const handleBack = () => {
    window.location.hash = "";
  };

  return (
    <div className={styles.gallery} key={slug}>
      <div className={styles.header}>
        <button type="button" className={styles.back} onClick={handleBack}>
          ← Back
        </button>
        <h2 className={styles.heading}>{category?.label ?? slug}</h2>
      </div>

      <div className={styles.grid}>
        {columns.map((column, columnIndex) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: columns are recomputed as a whole unit whenever the photo list or column count changes
          <div className={styles.column} key={columnIndex}>
            {column.map((photo) => (
              <button
                key={photo.url}
                type="button"
                className={styles.tile}
                style={
                  {
                    "--aspect": `${photo.width} / ${photo.height}`,
                    animationDelay: `${Math.min(photo.index, ALBUM_STAGGER_CAP) * ALBUM_STAGGER_MS}ms`,
                  } as React.CSSProperties
                }
                onClick={() => setLightboxIndex(photo.index)}
              >
                <img src={photo.url} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox photos={photos} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
      )}
    </div>
  );
}
