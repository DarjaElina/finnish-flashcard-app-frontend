import styles from "./Moose.module.css";
import clsx from "clsx";

export default function Moose({
  text,
  hasBg,
}: {
  text: string;
  hasBg?: boolean;
}) {
  return (
    <div className={styles.moose}>
      <img src="moose.png" alt="moose" className="moose-img" width="80"
        height="80"/>
      <p className={clsx(styles.mooseText, hasBg && styles.light)}>{text}</p>
    </div>
  );
}
