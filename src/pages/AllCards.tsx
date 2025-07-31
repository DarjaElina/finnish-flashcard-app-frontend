import { useQuery } from "@tanstack/react-query";
import Moose from "../components/Moose/Moose";
import MooseLoader from "../components/MooseLoader/MooseLoader";
import { getExternalWords } from "../services/words";
import Cards from "../components/Cards/Cards";

export default function AllCards() {
  const {
    data: words,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["externalWords"],
    queryFn: getExternalWords,
  });

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
      <Moose text="These are words from the outside world! Tap a card to flip it. Save the ones you like!" />
      {isSuccess && Array.isArray(words) && <Cards words={words} />}
    </div>
  );
}
