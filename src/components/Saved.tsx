import { useWords } from "../context/WordContext";
import Card from "./Card";
import Moose from "./Moose";

export default function Cards() {
  const { words, error } = useWords();

  if (error) {
    return <Moose text="Oops! Something went wrong! 😢" />;
  }

  if (words.length === 0) {
    return (
      <Moose text="Hmm... no words here just yet! Let’s add some and start your Finnish journey ✨" />
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
