'use client';

import { AuthState, User } from '@@/types/auth.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    logoutUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { saveUser, loginSuccess, registerSuccess, logoutUser } =
  authSlice.actions;

export default authSlice;
