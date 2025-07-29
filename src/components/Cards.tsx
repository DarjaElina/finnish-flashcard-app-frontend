import Card from "./Card";
import Moose from "./Moose";
import type { Word } from "../types/word.types";
import { useQuery } from "@tanstack/react-query";
import { getExternalWords } from "../services/words";

export default function Cards() {
  const {
    data: words,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["externalWords"],
    queryFn: getExternalWords,
  });

  if (isLoading) {
    return <Moose text="Loading words..." />;
  }

  if (isError) {
    return <Moose text="Oops! Something went wrong! 😢" />;
  }

  if (words.length === 0) {
    return (
      <Moose text="Oops! I tried fetching words from the cloud, but something went wrong. Maybe the internet moose got tangled? 🫎💻" />
    );
  }

  return (
    <div className="cards-container">
      <Moose text="These are words from the outside world! Tap a card to flip it. Save the ones you like!" />
      <div className="cards">
        {words && words.map((w: Word) => <Card key={w.id} word={w} />)}
      </div>
    </div>
  );
}
