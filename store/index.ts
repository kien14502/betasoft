import { menuActions } from './menu/menu.slice';
import { workspaceActions } from './workspace/workspace.slice';

export { default as StoreProvider } from './Provider';
export { default as StoreContext } from './Context';
export * from './hooks';

export const actions = {
  ...menuActions,
  ...workspaceActions,
};
