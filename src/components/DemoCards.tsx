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
  { id: "6", english: "moon", finnish: "kuu", example: "Kuu loistaa yöllä." },
  {
    id: "7",
    english: "star",
    finnish: "tähti",
    example: "Taivaalla näkyy kirkas tähti.",
  },
  {
    id: "8",
    english: "water",
    finnish: "vesi",
    example: "Join lasillisen vettä.",
  },
  {
    id: "9",
    english: "fire",
    finnish: "tuli",
    example: "Nuotiossa palaa tuli.",
  },
  {
    id: "10",
    english: "ice",
    finnish: "jää",
    example: "Jää peitti järven pinnan.",
  },
  {
    id: "11",
    english: "forest",
    finnish: "metsä",
    example: "Kävelimme hiljaiseen metsään.",
  },
  {
    id: "12",
    english: "bird",
    finnish: "lintu",
    example: "Lintu laulaa aamulla.",
  },
  {
    id: "13",
    english: "fish",
    finnish: "kala",
    example: "Kala ui vedessä nopeasti.",
  },
  {
    id: "14",
    english: "light",
    finnish: "valo",
    example: "Valo syttyi huoneessa.",
  },
  {
    id: "15",
    english: "shadow",
    finnish: "varjo",
    example: "Puu heittää pitkän varjon.",
  },
];

export default function DemoCards() {
  return (
    <div className="cards-container">
      <Moose text="These are demo words! 🫎 Tap a card to flip it. Want to save or edit words? Log in to unlock those powers! 🔐✨" />
      <div className="cards">
        {demoWords.map((w) => (
          <Card isDemo={true} key={w.id} word={w} />
        ))}
      </div>
    </div>
  );
}
