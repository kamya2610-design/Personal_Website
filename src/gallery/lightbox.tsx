import * as React from "react";
import type { MediaItem } from "~/src/infinite-canvas/types";
import styles from "./style.module.css";

type LightboxProps = {
  photos: MediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNavigate((index + 1) % photos.length);
      } else if (e.key === "ArrowLeft") {
        onNavigate((index - 1 + photos.length) % photos.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, photos.length, onClose, onNavigate]);

  if (!photo) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: backdrop click-to-close; Escape key (handled above) is the keyboard equivalent
    // biome-ignore lint/a11y/useKeyWithClickEvents: same as above
    <div className={styles.lightbox} onClick={handleBackdropClick}>
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Close">
        ✕
      </button>

      <button
        type="button"
        className={styles.lightboxPrev}
        onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
        aria-label="Previous photo"
      >
        ‹
      </button>

      <img key={photo.url} src={photo.url} alt="" className={styles.lightboxImage} />

      <button
        type="button"
        className={styles.lightboxNext}
        onClick={() => onNavigate((index + 1) % photos.length)}
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  );
}
