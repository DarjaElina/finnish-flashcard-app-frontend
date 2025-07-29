import { useQuery } from "@tanstack/react-query";
import { getWords } from "../services/words";

export const useWords = () => {
  return useQuery({
    queryKey: ["words"],
    queryFn: getWords,
  });
};
