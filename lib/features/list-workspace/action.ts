import { getListWorkspace } from '@/services/workspace-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getListWorkspaces = createAsyncThunk('list_ws/get', async (_, { rejectWithValue }) => {
  try {
    const res = await getListWorkspace();
    const data = res.data;
    return data || [];
  } catch (error) {
    rejectWithValue(error);
  }
});
