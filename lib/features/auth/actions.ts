import { authService } from '@/services/auth-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMe = createAsyncThunk(
  'auth/getMe',

  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getMe();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
