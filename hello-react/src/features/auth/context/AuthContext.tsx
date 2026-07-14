import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { login as loginApi } from "../api/authApi";
import type { AuthContextType, AuthTokenPayload, LoginCredentials, User } from "../types";

const AUTH_STORAGE_KEY = "auth_jwt_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function decodeJwt(token: string): AuthTokenPayload | null {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const payload = window.atob(payloadPart.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload) as AuthTokenPayload;
  } catch {
    return null;
  }
}

function getUserFromToken(token: string): User | null {
  const payload = decodeJwt(token);
  if (!payload || typeof payload.sub !== "string") {
    return null;
  }
  return { username: payload.sub };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!storedToken) return;

    const payload = decodeJwt(storedToken);
    if (payload && payload.exp > Math.floor(Date.now() / 1000)) {
      setToken(storedToken);
      setUser(getUserFromToken(storedToken));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const login = async ({ username, password }: LoginCredentials) => {
    const response = await loginApi({ username, password });
    localStorage.setItem(AUTH_STORAGE_KEY, response.accessToken);
    setToken(response.accessToken);
    setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token && user),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
