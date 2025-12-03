import { createSlice } from '@reduxjs/toolkit';
import { getInforWorkspace } from './action';
import { DetailWorkspace } from '@/interface/workspace';

export type WorkspaceState = {
  info: DetailWorkspace | null;
  loading: boolean;
  error?: string | null;
};

const initialState: WorkspaceState = {
  info: null,
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInforWorkspace.fulfilled, (state, action) => {
        state.info = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getInforWorkspace.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInforWorkspace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

// Sửa lỗi: Export action setState
export const {} = workspaceSlice.actions;

export default workspaceSlice.reducer;
