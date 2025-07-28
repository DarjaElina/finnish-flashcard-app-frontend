import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Moose from "./Moose";
import type { Word } from "../types/word.types";

export default function Cards() {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const BACKEND_URL = "some url";

  useEffect(() => {
    const getWords = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/words/external`);
        setError("some error 🦊");
        setWords([]);
        console.log(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getWords();
  }, []);

  console.log(words);

  if (loading) {
    return <Moose text="Loading your words..." />;
  }

  if (error) {
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
