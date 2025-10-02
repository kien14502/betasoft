'use client';

import { createContext, Dispatch } from 'react';
import { ActionType } from './constants';
import { TRootState } from './reducer';

export type StoreContextType = [TRootState, Dispatch<ActionType>];

const Context = createContext<StoreContextType | null>(null);

export default Context;
