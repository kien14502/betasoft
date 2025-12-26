'use client';

import { createContext, useState } from 'react';

type MODEL_TYPE = 'INFO' | 'MEMBERS' | 'SETTINGS' | null;

type State = {
  mode: MODEL_TYPE;
  onClose: () => void;
  onOpen: (type: MODEL_TYPE) => void;
};

export const PanelContext = createContext<State>({
  mode: null,
  onClose: () => {},
  onOpen: () => {},
});

type Props = {
  children: React.ReactNode;
};

const PanelProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<MODEL_TYPE>(null);
  const onClose = () => setIsOpen(null);
  const onOpen = (type: MODEL_TYPE) => setIsOpen((prev) => (prev === type ? null : type));

  return (
    <PanelContext.Provider value={{ mode: isOpen, onClose, onOpen }}>
      {children}
    </PanelContext.Provider>
  );
};

export default PanelProvider;
