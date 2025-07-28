import { useWords } from "../context/WordContext";
import Card from "./Card";
import Moose from "./Moose";

export default function Cards() {
  const { words, error } = useWords();

  if (error) {
    return (
      <div className="cards-container">
        <Moose text="Oops! Something went wrong! 😢" />
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="cards-container">
        <Moose text="Hmm... no words here just yet! Let’s add some and start your Finnish journey ✨" />
      </div>
    );
  }

  return (
    <div className="cards-container">
      <Moose text="Here are your saved flashcards! You can edit or delete them anytime." />
      <div className="cards">
        {words.map((w) => (
          <Card key={w.id} word={w} isSaved />
        ))}
      </div>
    </div>
  );
}
