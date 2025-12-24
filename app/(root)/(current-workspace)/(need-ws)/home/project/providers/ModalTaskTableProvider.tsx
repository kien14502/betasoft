import { Task } from '@/interface/task';
import { createContext, ReactNode, useState } from 'react';
import TaskDetailSheet from '../components/modals/TaskDetailSheet';

type ModalTaskTableContext = {
  isShowModal: boolean;
  content: Task | null;
  setShowModal: (value: boolean) => void;
  setContent: (value: Task | null) => void;
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
  const [content, setContent] = useState<Task | null>(null);

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
      <TaskDetailSheet
        isShowModal={isShowModal}
        toggle={() => setShowModal(!isShowModal)}
        task={content}
      />
    </ModalTaskTableContext.Provider>
  );
};

export default ModalTaskTableProvider;
