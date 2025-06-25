import axios from "axios";
import { AuthRequest, AuthResponse } from "../types/auth";
import { ApiResponse } from "../types/response";

const API_URL = process.env.REACT_APP_API_URL;

export const login = async ({
  email,
  password,
}: AuthRequest): Promise<ApiResponse<AuthResponse>> => {
  const res = await axios.post<ApiResponse<AuthResponse>>(
    `${API_URL}/auth/signin`,
    {
      email,
      password,
    }
  );
  return res.data;
};

export const signup = async ({
  email,
  password,
}: AuthRequest): Promise<AuthResponse> => {
  const res = await axios.post<AuthResponse>(`${API_URL}/auth/signup`, {
    email,
    password,
  });
  return res.data;
};
