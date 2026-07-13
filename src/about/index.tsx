import { BIO, HEADSHOT_SRC, RESUME_ENTRIES, RESUME_PDF_SRC, SHOW_HEADSHOT, SKILLS } from "./resume";
import styles from "./style.module.css";

export function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.script}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>KAMYA AGARWAL</h1>
            <p className={styles.subtitle}>written, shot &amp; edited by Kamya Agarwal</p>
          </div>

          <p className={styles.slug}>FADE IN:</p>

          <p className={styles.scene}>INT. NEW YORK CITY — PRESENT DAY</p>
          <p className={styles.action}>{BIO}</p>

          <p className={styles.transition}>CUT TO:</p>

          <p className={styles.scene}>CREW</p>
          {SKILLS.map((group) => (
            <p key={group.label} className={styles.action}>
              <span className={styles.crewLabel}>{group.label}</span> — {group.items.join(", ")}
            </p>
          ))}

          {RESUME_ENTRIES.map((entry) => (
            <div key={`${entry.organization}-${entry.role}`}>
              <p className={styles.scene}>
                {entry.setting}. {entry.organization.toUpperCase()} — {entry.dateStart.toUpperCase()}, {entry.dateEnd.toUpperCase()}
              </p>
              <p className={styles.action}>{entry.description ?? entry.role}</p>
            </div>
          ))}

          <p className={styles.transition}>FADE OUT.</p>

          <p className={styles.theEnd}>THE END</p>

          <p className={styles.credits}>
            <a href={RESUME_PDF_SRC} target="_blank" rel="noreferrer">
              full CV — roll credits ↓
            </a>
          </p>
        </div>

        {SHOW_HEADSHOT && (
          <div className={styles.photoColumn}>
            <div className={styles.polaroid}>
              <img src={HEADSHOT_SRC} alt="Kamya Agarwal" />
            </div>
          </div>
        )}
      </div>

      <div className={styles.pageNumber}>1.</div>
    </main>
  );
}
