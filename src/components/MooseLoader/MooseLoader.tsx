import styles from "./MooseLoader.module.css";

export default function MooseLoader() {
  return (
    <div className={styles.mooseLoader}>
      <img
        src="/moose.png"
        alt="Loading..."
        className={styles.mooseLoaderImg}
        width="80"
        height="80"
      />
      <p>Loading...</p>
    </div>
  );
}
