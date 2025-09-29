import { ActionType } from '../constants';

export type TConfigState = {
  theme: string;
};

export const initConfigState: TConfigState = {
  theme: 'light',
};

export const configActions = {};

export function configReducer(state: TConfigState, action: ActionType): TConfigState {
  switch (action.type) {
    default:
      return state;
  }
}
