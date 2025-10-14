import { ActionType } from '../constants';

const SET_ACTIVE_MENU = 'set_active_menu';

export type TMenuState = {
  activeMenuKey: null | string;
};

export const initMenuState = {
  activeMenuKey: null,
};

export const menuActions = {
  setActiveMenu: (payload: string) => ({
    type: SET_ACTIVE_MENU,
    payload,
  }),
};

export function menuReducer(state: TMenuState, action: ActionType): TMenuState {
  switch (action.type) {
    case SET_ACTIVE_MENU:
      return { ...state, activeMenuKey: action.payload };
    default:
      return state;
  }
}
