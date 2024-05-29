export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ChangePasswordType {
  password: string;
  newPassword: string;
  confirmNewPassword?: string;
}

export interface ResetPasswordType {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accessToken: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null | unknown;
};
