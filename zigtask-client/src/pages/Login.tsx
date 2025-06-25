import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuthStore } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../api/auth";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setAuth, token } = useAuthStore();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => loginApi({ email, password }),
    onSuccess: (data) => {
      setAuth(data.data.access_token, data.data.user);
      navigate("/dashboard");
    },
  });

  React.useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <Alert severity="error">
            {(error as unknown as any).response?.data?.message ||
              "Login failed"}
          </Alert>
        )}
        <Box mt={2} display="flex" alignItems="center">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
            fullWidth
          >
            {isPending ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </Box>
      </form>
      <Box mt={2}>
        <Button onClick={() => navigate("/signup")}>
          Don't have an account? Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
