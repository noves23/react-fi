import type { AuthResponse, LoginCredentials } from "../types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function base64UrlEncode(value: string) {
  return window.btoa(value)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createMockJwt(username: string) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64UrlEncode(
    JSON.stringify({
      sub: username,
      name: username,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    })
  );
  const signature = "mock-signature";
  return `${header}.${payload}.${signature}`;
}

export async function login({ username, password }: LoginCredentials): Promise<AuthResponse> {
  await delay(500);

  if (!username.trim() || !password.trim()) {
    throw new Error("Please provide both user name and password.");
  }

  return {
    accessToken: createMockJwt(username),
    tokenType: "Bearer",
    expiresIn: 60 * 60,
    user: {
      username,
    },
  };
}
