import * as React from "react";
import manifest from "~/src/portfolio/manifest.json";
import { AboutPage } from "~/src/about";
import { ContactPage } from "~/src/contact";
import { FilmDetail } from "~/src/film/detail";
import { FilmPage } from "~/src/film";
import { Frame } from "~/src/frame";
import { Gallery } from "~/src/gallery";
import { InfiniteCanvas } from "~/src/infinite-canvas";
import type { MediaItem } from "~/src/infinite-canvas/types";

const ALBUM_HASH_PREFIX = "#album/";
const FILM_HASH_PREFIX = "#film/";

function useHash() {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

export function App() {
  const [media] = React.useState<MediaItem[]>(manifest);
  const hash = useHash();

  if (hash === "#about") {
    return (
      <>
        <Frame showName={false} />
        <AboutPage />
      </>
    );
  }

  if (hash === "#contact") {
    return (
      <>
        <Frame showName={false} />
        <ContactPage />
      </>
    );
  }

  if (hash === "#film") {
    return (
      <>
        <Frame showName={false} />
        <FilmPage />
      </>
    );
  }

  if (hash.startsWith(FILM_HASH_PREFIX)) {
    return (
      <>
        <Frame showName={false} showTopNav={false} />
        <FilmDetail slug={hash.slice(FILM_HASH_PREFIX.length)} />
      </>
    );
  }

  if (hash.startsWith(ALBUM_HASH_PREFIX)) {
    return (
      <>
        <Frame showName={false} showTopNav={false} />
        <Gallery slug={hash.slice(ALBUM_HASH_PREFIX.length)} media={media} />
      </>
    );
  }

  return (
    <>
      <Frame />
      <InfiniteCanvas media={media} />
    </>
  );
}
