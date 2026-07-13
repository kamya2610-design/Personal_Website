import * as React from "react";
import styles from "./style.module.css";

const CONTACT_EMAIL = "kamya2610@gmail.com";

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22 12s0-3.4-.44-4.9a2.8 2.8 0 0 0-1.96-1.98C17.9 4.7 12 4.7 12 4.7s-5.9 0-7.6.42a2.8 2.8 0 0 0-1.96 1.98C2 8.6 2 12 2 12s0 3.4.44 4.9a2.8 2.8 0 0 0 1.96 1.98c1.7.42 7.6.42 7.6.42s5.9 0 7.6-.42a2.8 2.8 0 0 0 1.96-1.98C22 15.4 22 12 22 12Z"
        stroke="#ffffff"
        strokeWidth="1.6"
      />
      <path d="M10 9.5v5l4.5-2.5-4.5-2.5Z" fill="#ffffff" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="19" height="19" rx="2.5" stroke="#ffffff" strokeWidth="1.6" />
      <rect x="6.2" y="9.8" width="2.2" height="8" fill="#ffffff" />
      <circle cx="7.3" cy="6.8" r="1.3" fill="#ffffff" />
      <path
        d="M11.5 17.8v-8h2.1v1.2c.5-.8 1.4-1.4 2.6-1.4 2 0 3.1 1.3 3.1 3.6v4.6h-2.2v-4.2c0-1.2-.5-1.9-1.5-1.9-1 0-1.7.7-1.7 1.9v4.2h-2.4Z"
        fill="#ffffff"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.6" stroke="#ffffff" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="#ffffff" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { label: "YouTube", href: "https://youtube.com/@kamya2610", Icon: YoutubeIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kamya-agarwal-761917183", Icon: LinkedinIcon },
  { label: "Instagram", href: "https://www.instagram.com/kaammyyaaaa", Icon: InstagramIcon },
];

export function ContactPage() {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <main className={styles.page}>
      <div className={styles.column}>
        <h1 className={styles.heading}>Get in touch</h1>
        <p className={styles.intro}>Send a message, or find me here.</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span className={styles.label}>Name</span>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Query</span>
            <textarea
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
            />
          </label>

          <button type="submit" className={styles.submit}>
            Send
          </button>
        </form>

        <div className={styles.socials}>
          {SOCIAL_LINKS.map((social) => (
            <a key={social.label} className={styles.socialLink} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
              <social.Icon />
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
