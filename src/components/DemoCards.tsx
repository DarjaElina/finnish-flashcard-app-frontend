import Card from "./Card";
import Moose from "./Moose";
import type { Word } from "../types/word.types";

const demoWords: Word[] = [
  {
    id: "1",
    english: "cat",
    finnish: "kissa",
    example: "Kissa nukkuu sohvalla.",
  },
  {
    id: "2",
    english: "dog",
    finnish: "koira",
    example: "Koira juoksee puistossa.",
  },
  {
    id: "3",
    english: "moose",
    finnish: "hirvi",
    example: "Hirvi seisoo tien vieressä.",
  },
  {
    id: "4",
    english: "heart",
    finnish: "sydän",
    example: "Sydän sykkii nopeasti.",
  },
  {
    id: "5",
    english: "sun",
    finnish: "aurinko",
    example: "Aurinko paistaa kirkkaasti.",
  },
];

export default function DemoCards() {
  return (
    <div className="cards-container">
      <Moose text="These are demo words! Tap a card to flip it. Want to save or edit words? Log in to unlock those powers!" />
      <div className="cards">
        {demoWords.map((w) => (
          <Card isDemo={true} key={w.id} word={w} />
        ))}
      </div>
    </div>
  );
}
