import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';

import workspaceSlice from './features/workspace/workspaceSlice';
import memberWsSlice from './features/workspace/memberWsSlice';
import listWorkspaceSlice from './features/list-workspace/listWorkspaceSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      workspace: workspaceSlice,
      memberWorkspace: memberWsSlice,
      listWorkspace: listWorkspaceSlice,
    },
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware({
    //     serializableCheck: {
    //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    //     },
    //   }),
  });
};

export const store = makeStore();

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
