export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user: AuthUser;
}
