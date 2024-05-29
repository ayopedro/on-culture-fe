export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  name: string;
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
  password: string;
  confirmPassword: string;
}
