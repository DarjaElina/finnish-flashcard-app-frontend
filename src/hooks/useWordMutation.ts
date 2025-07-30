import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWord, deleteWord, updateWord } from "../services/words";
import type { Word } from "../types/word.types";
import { showSuccess, showError } from "../utils";

export function useCreateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newWord: Omit<Word, "id">) => createWord(newWord),
    onSuccess: () => {
      showSuccess("Word created!");
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
    onError: (e) => {
      showError(e.message ?? "Error saving word");
    },
  });
}

export function useUpdateWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updatedWord,
    }: {
      id: string;
      updatedWord: Omit<Word, "id">;
    }) => updateWord(id, updatedWord),
    onSuccess: () => {
      showSuccess("Updated!");
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
    onError: (e) => {
      showError(e.message ?? "Error updating word");
    },
  });
}

export function useDeleteWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteWord(id),
    onSuccess: () => {
      showSuccess("Deleted!", "The word has been deleted.");
      queryClient.invalidateQueries({ queryKey: ["words"] });
    },
    onError: (e) => {
      showError(e.message ?? "Error deleting word");
    },
  });
}
