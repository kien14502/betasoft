import React, { useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Task } from '@/interface/task';
import { ModalTaskTableContext } from '../../providers/ModalTaskTableProvider';

type SortableTaskItemProps = {
  children: React.ReactNode;
  task: Task;
};

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ task, children }) => {
  const { isShowModal, setContent, setShowModal } = useContext(ModalTaskTableContext);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id,
    disabled: isShowModal,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  // Chỉ lấy mouse listeners, bỏ keyboard listeners
  const mouseOnlyListeners: React.HTMLAttributes<HTMLDivElement> = {
    onPointerDown: listeners?.onPointerDown as
      | React.PointerEventHandler<HTMLDivElement>
      | undefined,
  };

  const handleShowModal = () => {
    setContent(task);
    setShowModal(true);
  };

  return (
    <>
      <div
        onClick={handleShowModal}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...mouseOnlyListeners}
      >
        {children}
      </div>
    </>
  );
};
export default SortableTaskItem;
