import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth";

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getCurrentUser,
  });
};
