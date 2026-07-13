import { FILMS } from "./films";
import styles from "./style.module.css";

type FilmDetailProps = {
  slug: string;
};

export function FilmDetail({ slug }: FilmDetailProps) {
  const film = FILMS.find((f) => f.slug === slug);

  const handleClose = () => {
    window.location.hash = "#film";
  };

  if (!film) {
    return (
      <div className={styles.filmDetail}>
        <div className={styles.detailHeader}>
          <button type="button" className={styles.close} onClick={handleClose}>
            Close
          </button>
        </div>
        <p className={styles.notFound}>Film not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.filmDetail} key={film.slug}>
      <div className={styles.detailHeader}>
        <button type="button" className={styles.close} onClick={handleClose}>
          Close
        </button>
      </div>

      <div className={styles.playerWrap}>
        <iframe
          className={styles.player}
          src={`https://www.youtube.com/embed/${film.youtubeId}`}
          title={film.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>

      <div className={styles.detailBody}>
        <h2 className={styles.detailTitle}>{film.title}</h2>

        {film.year && <p className={styles.detailYear}>Year: {film.year}</p>}
        {film.synopsis && <p className={styles.detailSynopsis}>{film.synopsis}</p>}

        {(film.crew?.length || film.cast?.length) && (
          <>
            <hr className={styles.divider} />
            <h3 className={styles.creditsHeading}>Cast and Crew</h3>
            <div className={styles.creditsGrid}>
              <div className={styles.creditsColumn}>
                {film.crew?.map((group) => (
                  <div key={group.role} className={styles.creditGroup}>
                    <div className={styles.creditRole}>{group.role}</div>
                    {group.names.map((name) => (
                      <div key={name} className={styles.creditName}>
                        {name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className={styles.creditsColumn}>
                {film.cast?.map((group) => (
                  <div key={group.role} className={styles.creditGroup}>
                    <div className={styles.creditRole}>{group.role}</div>
                    {group.names.map((name) => (
                      <div key={name} className={styles.creditName}>
                        {name}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
