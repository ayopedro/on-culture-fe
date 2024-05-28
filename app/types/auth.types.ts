export interface LoginType {
  email: string;
  password: string;
}

export interface RegisterType {
  customer_name: string;
  email: string;
  password: string;
}

export interface ChangePasswordType {
  password: string;
  newPassword: string;
  confirmNewPassword?: string;
}

export interface ResetPasswordType {
  newPassword: string;
  confirmNewPassword: string;
}
