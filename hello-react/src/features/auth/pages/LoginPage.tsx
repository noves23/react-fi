import { useState } from "react";
import { Button, Container, Paper, Stack, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import type { LoginCredentials } from "../types";

export function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const credentials: LoginCredentials = { username, password };

    try {
      await login(credentials);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography component="h1" variant="h5" gutterBottom>
          Login
        </Typography>

        <Stack component="form" spacing={2} noValidate onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : null}

          <TextField
            label="User name"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            fullWidth
          />

          <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
