import type { PaginatedData, Word } from "../types/word.types";
import api from "./index";

export const createWord = async ({
  finnish,
  english,
  example,
}: Omit<Word, "id">) => {
  const response = await api.post("/words", { finnish, english, example });
  return response.data;
};

export const getWords = async () => {
  const response = await api.get("/words");
  return response.data;
};

export const updateWord = async (id: string, word: Omit<Word, "id">) => {
  const response = await api.put(`/words/${id}`, word);
  return response.data;
};

export const deleteWord = async (id: string) => {
  const response = await api.delete(`/words/${id}`);
  return response.data;
};

export const getSharedWords = async (page = 1): Promise<PaginatedData> => {
  const response = await api.get(`words/shared?page=${page}`);
  return response.data;
};
