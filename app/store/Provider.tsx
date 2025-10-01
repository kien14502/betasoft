'use client';

import Context from './Context';
import { useReducer } from 'react';
import reducer, { initState, TRootState } from './reducer';
import { ActionType } from './constants';

type Context = {
  state: TRootState;
  dispatch: React.Dispatch<ActionType>;
};

function Provider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initState);
  // console.log(state);
  return (
    <Context.Provider value={[state, dispatch] as [TRootState, React.Dispatch<ActionType>]}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
