import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import { createContext, ReactNode, useState } from 'react';

type ModalTaskTableContext = {
  isShowModal: boolean;
  content: ResponseTaskResponse | null;
  setShowModal: (value: boolean) => void;
  setContent: (value: ResponseTaskResponse | null) => void;
};

const defaultValue: ModalTaskTableContext = {
  isShowModal: false,
  content: null,
  setShowModal: () => {},
  setContent: () => {},
};

export const ModalTaskTableContext = createContext<ModalTaskTableContext>(defaultValue);

type Props = {
  children: ReactNode;
};

const ModalTaskTableProvider = ({ children }: Props) => {
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<ResponseTaskResponse | null>(null);

  return (
    <ModalTaskTableContext.Provider
      value={{
        setShowModal,
        isShowModal,
        content,
        setContent,
      }}
    >
      {children}
    </ModalTaskTableContext.Provider>
  );
};

export default ModalTaskTableProvider;
