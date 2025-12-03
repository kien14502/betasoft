import { Organization } from '@/interface/workspace';
import { createSlice } from '@reduxjs/toolkit';
import { getListWorkspaces } from './action';

type ListWorkspaceStaste = {
  items: Organization[];
  isLoading: boolean;
};

const initialState: ListWorkspaceStaste = {
  isLoading: false,
  items: [],
};

const listWorkspaceSlice = createSlice({
  name: 'list-workspace',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListWorkspaces.pending, (state) => {
        state.isLoading = true;
        state.items = [];
      })
      .addCase(getListWorkspaces.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload?.organizations || [];
      })
      .addCase(getListWorkspaces.rejected, (state) => {
        state.isLoading = false;
        state.items = [];
      });
  },
});

export const {} = listWorkspaceSlice.actions;

export default listWorkspaceSlice.reducer;
