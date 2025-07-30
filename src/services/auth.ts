import type { AuthResponse } from "../types/auth.types";
import type { User } from "../types/user.types";
import { getToken, removeToken, saveToken } from "../utils/token";
import api from "./index";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await api.post("/login", { email, password });
  const { token } = response.data;
  if (token) saveToken(token);
  return response.data;
};

export const signup = async ({
  name,
  email,
  password,
  password_confirmation,
}: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}): Promise<AuthResponse> => {
  const response = await api.post("/signup", {
    name,
    email,
    password,
    password_confirmation,
  });
  const { token } = response.data;
  if (token) saveToken(token);
  return response.data;
};

export const logout = async (): Promise<void> => {
  const token = getToken();
  if (token) {
    await api.post(
      "/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
  removeToken();
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
};
