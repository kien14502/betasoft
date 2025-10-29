import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';
import { useDroppable } from '@dnd-kit/core';
import Image from 'next/image';
import { ResponseTaskListResponse, ResponseTaskResponse } from '@/app/api/generated.schemas';
import { Button } from '@/components/ui/button';
import { Ellipsis } from 'lucide-react';

type BoardSectionProps = {
  id: string;
  section?: ResponseTaskListResponse;
  tasks: ResponseTaskResponse[];
};

const BoardSection: React.FC<BoardSectionProps> = ({ id, section, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  if (!section) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 w-full">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: section.color }} />
        <span className="text-text-primary text-sm font-medium capitalize">{section.name}</span>
        <span>{section.tasks_count}</span>
        <Button className="!ml-auto">
          <Ellipsis />
        </Button>
      </div>
      <SortableContext
        id={id}
        items={tasks.map((item) => ({ ...item, id: item.id ?? '' }))}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="flex flex-col gap-4">
          {tasks.map((task) => (
            <SortableTaskItem key={task.id} id={task.id ?? ''}>
              <TaskItem task={task} />
            </SortableTaskItem>
          ))}
        </div>
      </SortableContext>
      <button className="text-sm flex items-center font-medium gap-1.5 !py-2.5 !px-4">
        <Image src={'/icons/plus.svg'} alt={''} width={20} height={20} />
        New task
      </button>
    </div>
  );
};
export default BoardSection;
