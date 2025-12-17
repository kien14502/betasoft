import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SortableTaskItemProps = {
  children: React.ReactNode;
  id: string;
};

const SortableTaskItem: React.FC<SortableTaskItemProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
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

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...mouseOnlyListeners}>
      {children}
    </div>
  );
};
export default SortableTaskItem;
