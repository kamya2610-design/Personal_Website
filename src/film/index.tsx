import { FILMS, getFilmPoster } from "./films";
import styles from "./style.module.css";

export function FilmPage() {
  return (
    <div className={styles.filmGallery}>
      <div className={styles.filmGalleryTrack}>
        {FILMS.map((film) => (
          <a
            key={film.slug}
            className={styles.filmCard}
            href={`#film/${film.slug}`}
            style={{ backgroundImage: `url(${getFilmPoster(film)})` }}
          >
            <span className={styles.filmCardTitle}>{film.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
