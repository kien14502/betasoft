import { User } from '@/interface/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMe } from './actions';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setAuth: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(getMe.fulfilled, (state, { payload }) => {
      state.user = payload;
    });
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setAuth } = authSlice.actions;
export default authSlice.reducer;
