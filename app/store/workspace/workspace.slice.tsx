import { ResponseOrganizationResponse } from '@/app/api/generated.schemas';
import { ActionType } from '../constants';

const SET_ACTIVE_WORKSPACE = 'set_active_workspace';

export type TWorkspaceState = {
  workspaceActive?: ResponseOrganizationResponse;
};

export const initWorkspaceState: TWorkspaceState = {
  workspaceActive: undefined,
};

export const workspaceActions = {
  setWorkspaceActive: (payload?: ResponseOrganizationResponse) => ({
    type: SET_ACTIVE_WORKSPACE,
    payload,
  }),
};

export function workspaceReducer(state: TWorkspaceState, action: ActionType): TWorkspaceState {
  switch (action.type) {
    case SET_ACTIVE_WORKSPACE:
      return { ...state, workspaceActive: action.payload };
    default:
      return state;
  }
}
