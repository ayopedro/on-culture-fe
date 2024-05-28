import Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string().trim().required('Password is required!'),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string()
    .trim()
    .email('Invalid email!')
    .required('Email is required!'),
  password: Yup.string().trim().required('Password is required!'),
});

export const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string().trim().required('Current password is required'),
  newPassword: Yup.string()
    .trim()
    .required('New password is required')
    .test(
      'passwords-match',
      'New password must be different from the current password',
      function (value) {
        const password = this.parent.password;
        return value !== password;
      }
    ),
  confirmNewPassword: Yup.string()
    .trim()
    .required('Confirm new password is required')
    .test(
      'passwords-match',
      'Password must be the same as the new password',
      function (value) {
        const newPassword = this.parent.newPassword;
        return value === newPassword;
      }
    ),
});

export const ResetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string().trim().required('New password is required'),
  confirmNewPassword: Yup.string()
    .trim()
    .required('Confirm new password is required')
    .test(
      'passwords-match',
      'Password must be the same as the new password',
      function (value) {
        const newPassword = this.parent.newPassword;
        return value === newPassword;
      }
    ),
});
