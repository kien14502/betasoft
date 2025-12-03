import { authService } from '@/services/auth-service';
import { launchWorkspace } from '@/services/workspace-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getMe = createAsyncThunk('auth/getMe', async (_, { rejectWithValue }) => {
  try {
    const res = await authService.getMe();
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const launchWorkspaceUser = createAsyncThunk(
  'auth/launch_ws',
  async (wsId: string, { rejectWithValue }) => {
    try {
      const res = await launchWorkspace(wsId);
      return res.data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);
