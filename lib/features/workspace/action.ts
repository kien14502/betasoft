import { getMembersWorkspace, getWorkspace } from '@/services/workspace-service';
import { createAsyncThunk } from '@reduxjs/toolkit';

type ID = {
  id: string;
};

export const getMembers = createAsyncThunk(
  'ws/members',

  async ({ id }: ID, { rejectWithValue }) => {
    try {
      const res = await getMembersWorkspace(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getInforWorkspace = createAsyncThunk(
  'ws/info',
  async ({ id }: ID, { rejectWithValue }) => {
    try {
      const res = await getWorkspace(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
