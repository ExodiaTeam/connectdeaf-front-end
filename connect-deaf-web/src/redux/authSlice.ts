import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  expiresIn: number | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  expiresIn: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.expiresIn = null;
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiry');
    },
    setAuthStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    login: (state, action: PayloadAction<{ token: string; expiresIn: number }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('tokenExpiry', action.payload.expiresIn.toString());
    },
  },
});

export const { logout, setAuthStatus, login } = authSlice.actions;

export default authSlice.reducer;