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
import { signup as signupApi } from "../api/auth";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => signupApi({ email, password }),
    onSuccess: (data) => {
      setAuth(data.access_token, data.user);
      navigate("/dashboard");
    },
  });

  React.useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    mutate();
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h4" mb={2}>
        Sign Up
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
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {(localError || error) && (
          <Alert severity="error">
            {localError ||
              (error as unknown as any).response?.data?.message ||
              "Signup failed"}
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
            {isPending ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
        </Box>
      </form>
      <Box mt={2}>
        <Button onClick={() => navigate("/login")}>
          Already have an account? Login
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
