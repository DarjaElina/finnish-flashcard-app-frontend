import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h3>Attributions 💜</h3>
      <a
        className={styles.link}
        href="https://www.flaticon.com/free-icons/moose"
        title="moose icons"
      >
        Moose icon created by Flat Icons - Flaticon
      </a>
    </footer>
  );
}
