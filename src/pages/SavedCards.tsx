import Cards from "../components/Cards/Cards";
import Moose from "../components/Moose/Moose";
import MooseLoader from "../components/MooseLoader/MooseLoader";
import { useWords } from "../hooks/useWords";

export default function AllCards() {
  const { data: words, isLoading, isError } = useWords();

  if (isLoading) {
    return <MooseLoader />;
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
      <Cards words={words} />
    </div>
  );
}
