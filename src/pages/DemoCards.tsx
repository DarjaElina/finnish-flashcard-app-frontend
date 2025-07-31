import Cards from "../components/Cards/Cards";
import Moose from "../components/Moose/Moose";
import { demoWords } from "../utils/word";

export default function DemoCards() {
  return (
    <div className="cards-container">
      <Moose text="These are demo words! Tap a card to flip it. Want to save or edit words? Log in to unlock those powers!" />
      <Cards isDemo={true} words={demoWords} />
    </div>
  );
}
