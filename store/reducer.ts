import { configReducer, initConfigState, TConfigState } from './config/config.slice';
import { initMenuState, menuReducer, TMenuState } from './menu/menu.slice';
import { initWorkspaceState, TWorkspaceState, workspaceReducer } from './workspace/workspace.slice';

export type TRootState = {
  config: TConfigState;
  menu: TMenuState;
  workspace: TWorkspaceState;
};

export const initState: TRootState = {
  menu: initMenuState,
  config: initConfigState,
  workspace: initWorkspaceState,
};

export function rootReducer(state: TRootState, action: any): TRootState {
  return {
    menu: menuReducer(state.menu, action),
    config: configReducer(state.config, action),
    workspace: workspaceReducer(state.workspace, action),
  };
}

export default rootReducer;
