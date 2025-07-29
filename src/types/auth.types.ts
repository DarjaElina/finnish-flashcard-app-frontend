import type { User } from "./user.types";

export interface AuthResponse {
  status: boolean;
  message: string;
  user?: User;
  token?: string;
  token_type?: string;
  errors?: string[];
}
