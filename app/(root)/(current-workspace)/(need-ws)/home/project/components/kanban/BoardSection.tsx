import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';
import { useDroppable } from '@dnd-kit/core';
import { ResponseTaskListResponse, ResponseTaskResponse } from '@/app/api/generated.schemas';
import { Button } from '@/components/ui/button';
import { Ellipsis, Plus } from 'lucide-react';
import NewTask from './NewTask';
import { memo } from 'react';
import { hexToRGB } from '@/utils/common';
import { ScrollArea } from '@/components/ui/scroll-area';

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

  const { b, g, r } = hexToRGB(section.color || '');

  return (
    <div
      style={{
        backgroundColor: `rgb(${r}, ${g}, ${b}, 0.2)`,
        boxShadow: '0px 0px 4px 0px hsla(0, 0%, 0%, 0.2)',
      }}
      className="rounded-3xl min-h-0 flex flex-col h-fit pb-4 relative"
    >
      <div className="flex items-center px-4 pt-4 gap-2 w-full justify-between">
        <div
          className="p-1 pl-3 h-6 flex items-center rounded-2xl gap-2"
          style={{ backgroundColor: section.color }}
        >
          <span className="text-xs font-medium uppercase text-white">{section.name}</span>
          <div className="h-4 w-4 rounded-full bg-white text-[10px] flex items-center justify-center">
            {tasks.length}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button size={'icon-sm'} variant={'ghost'} className="ml-auto">
            <Plus color={section.color} />
          </Button>
          <Button size={'icon-sm'} variant={'ghost'} className="ml-auto">
            <Ellipsis />
          </Button>
        </div>
      </div>
      <SortableContext
        id={id}
        items={tasks.map((item) => ({ ...item, id: item.id ?? '' }))}
        strategy={verticalListSortingStrategy}
      >
        <ScrollArea ref={setNodeRef} className="overflow-x-hidden">
          <div className="p-4 pb-0 flex flex-col gap-4  pb-2">
            {tasks.map((task) => (
              <SortableTaskItem key={task.id} id={task.id ?? ''}>
                <TaskItem task={task} />
              </SortableTaskItem>
            ))}
          </div>
        </ScrollArea>
      </SortableContext>
      <NewTask section={section} />
    </div>
  );
};
export default memo(BoardSection);
