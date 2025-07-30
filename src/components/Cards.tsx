import Card from "./Card";
import Moose from "./Moose";
import type { Word } from "../types/word.types";
import { useQuery } from "@tanstack/react-query";
import { getExternalWords } from "../services/words";
import MooseLoader from "./MooseLoader";

export default function Cards() {
  const {
    data: words,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["externalWords"],
    queryFn: getExternalWords,
  });

  console.log(words);

  if (isLoading) {
    return <MooseLoader />;
  }

  if (isError || words.length === 0 || !Array.isArray(words)) {
    return (
      <Moose text="Oops! I tried fetching words from the cloud, but something went wrong. Maybe the internet moose got tangled? 🫎💻" />
    );
  }

  return (
    <div className="cards-container">
      {isSuccess && Array.isArray(words) && (
        <>
          <Moose text="These are words from the outside world! Tap a card to flip it. Save the ones you like!" />
          <div className="cards">
            {words.map((w: Word) => (
              <Card key={w.id} word={w} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
