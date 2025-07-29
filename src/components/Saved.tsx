import { useWords } from "../hooks/useWords";
import type { Word } from "../types/word.types";
import Card from "./Card";
import Moose from "./Moose";

export default function Cards() {
  const { data: words, isLoading, isError } = useWords();

  if (isLoading) {
    return <Moose text="Loading your words..." />;
  }

  if (isError) {
    return <Moose text="Oops! Something went wrong! 😢" />;
  }

  if (!words || words.length === 0) {
    return (
      <Moose text="Hmm... no words here just yet! Let’s add some and start your Finnish journey ✨" />
    );
  }

  return (
    <div className="cards-container">
      <Moose text="Here are your saved flashcards! You can edit or delete them anytime." />
      <div className="cards">
        {words.map((w: Word) => (
          <Card key={w.id} word={w} isSaved />
        ))}
      </div>
    </div>
  );
}
