import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import type { Word } from "../types/word.types";

interface WordContextType {
  words: Word[];
  error: string | null;
  addWord: (newWord: Omit<Word, "id">) => Promise<void>;
  updateWord: (
    id: string | number,
    updatedWord: Partial<Word>,
  ) => Promise<void>;
  deleteWord: (id: string | number) => Promise<void>;
}

const WordContext = createContext<WordContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useWords = (): WordContextType => {
  const context = useContext(WordContext);
  if (!context) {
    throw new Error("useWords must be used within a WordProvider");
  }
  return context;
};

interface WordProviderProps {
  children: ReactNode;
}

export const WordProvider = ({ children }: WordProviderProps) => {
  const [words, setWords] = useState<Word[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<{ words?: Word[] }>("api/words")
      .then((res) => setWords(res.data.words ?? []))
      .catch(() => setError("Failed to fetch words"));
  }, []);

  const addWord = async (newWord: Omit<Word, "id">) => {
    try {
      const { data } = await axios.post<Word>("/api/words", newWord);
      setWords((prev) => [...prev, data]);
    } catch {
      throw new Error("Failed to save word");
    }
  };

  const updateWord = async (
    id: string | number,
    updatedWord: Partial<Word>,
  ) => {
    try {
      const { data } = await axios.patch<Word>(`/api/words/${id}`, updatedWord);
      setWords((prev) => prev.map((w) => (w.id === id ? data : w)));
    } catch {
      throw new Error("Failed to update word");
    }
  };

  const deleteWord = async (id: string | number) => {
    try {
      await axios.delete(`/api/words/${id}`);
      setWords((prev) => prev.filter((w) => w.id !== id));
    } catch {
      throw new Error("Failed to delete word!");
    }
  };

  return (
    <WordContext.Provider
      value={{ words, addWord, error, updateWord, deleteWord }}
    >
      {children}
    </WordContext.Provider>
  );
};
