import { User } from '@/interface/auth';
import { createSlice } from '@reduxjs/toolkit';
import { getMembers } from './action';

export type WorkspaceState = {
  members: User[];
  loading: boolean;
  error?: string | null;
};

const initialState: WorkspaceState = {
  loading: false,
  members: [],
  error: null,
};

const workspaceSlice = createSlice({
  name: 'member_workspace',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Dùng builder.addCase liên tiếp (chaining)
    builder
      .addCase(getMembers.fulfilled, (state, action) => {
        state.members = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch members';
      });
  },
});

// Sửa lỗi: Export action setState
export const {} = workspaceSlice.actions;

export default workspaceSlice.reducer;
