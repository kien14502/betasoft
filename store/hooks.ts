'use client';

import { useContext } from 'react';
import Context, { StoreContextType } from './Context';

export const useStore = (): StoreContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useStore must be used within Provider');
  }
  return context;
};
