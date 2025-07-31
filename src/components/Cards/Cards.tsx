import Card from "../Card/Card";
import type { Word } from "../../types/word.types";
import styles from "./Cards.module.css";

export default function Cards({
  words,
  isDemo,
}: {
  words: Word[];
  isDemo?: boolean;
}) {
  return (
    <ul className={styles.cards}>
      {words.map((w: Word) => (
        <Card isDemo={isDemo} key={w.id} word={w} />
      ))}
    </ul>
  );
}
