import { useMutation } from '@tanstack/react-query';
import { URLS } from '../urls';
import {
  LoginType,
  ChangePasswordType,
  RegisterType,
  ResetPasswordType,
} from '@@/app/types/auth.types';
import axios from '../axios';

export const useLoginMutation = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: async (data: LoginType) => {
      const res = await axios.post(URLS.login, data);
      return res.data;
    },
  });

export const useRegisterMutation = () =>
  useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: RegisterType) => {
      const res = await axios.post(URLS.register, data);
      return res.data;
    },
  });

export const useChangePasswordMutation = () =>
  useMutation({
    mutationKey: ['changePassword'],
    mutationFn: async (data: ChangePasswordType) => {
      const res = await axios.patch(URLS.changePassword, data);
      return res.data;
    },
  });

export const useResetPasswordMutation = () =>
  useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async (data: ResetPasswordType) => {
      const res = await axios.patch(URLS.resetPassword, data);
      return res.data;
    },
  });
