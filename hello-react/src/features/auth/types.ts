export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  username: string;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: "Bearer";
  expiresIn: number;
  user: User;
}

export interface AuthTokenPayload {
  sub: string;
  name: string;
  iat: number;
  exp: number;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}
