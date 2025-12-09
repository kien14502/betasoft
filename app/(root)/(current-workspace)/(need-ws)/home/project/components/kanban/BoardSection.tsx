import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableTaskItem from './SortableTaskItem';
import TaskItem from './TaskItem';
import { useDroppable } from '@dnd-kit/core';
import { Button } from '@/components/ui/button';
import { Ellipsis, Plus } from 'lucide-react';
import NewTask from './NewTask';
import { memo, useRef } from 'react';
import { hexToRGB } from '@/utils/common';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Task, TaskSection } from '@/interface/task';

type BoardSectionProps = {
  id: string;
  section?: TaskSection;
  tasks: Task[];
  isPending: boolean;
};

const BoardSection: React.FC<BoardSectionProps> = ({ id, section, tasks }) => {
  const { setNodeRef } = useDroppable({
    id,
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

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
          <Button onClick={scrollToBottom} size={'icon-sm'} variant={'ghost'} className="ml-auto">
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
        <ScrollArea
          style={{
            scrollbarColor: section.color,
          }}
          ref={(ref) => {
            setNodeRef(ref);
            scrollAreaRef.current = ref;
          }}
          className="overflow-x-hidden"
        >
          <div className="p-4 pb-0 flex flex-col gap-4">
            {tasks.map((task) => (
              <SortableTaskItem key={task.id} id={task.id ?? ''}>
                <TaskItem task={task} />
              </SortableTaskItem>
            ))}
            <NewTask section={section} onBottom={scrollToBottom} />
            <div ref={bottomRef} />
          </div>
        </ScrollArea>
      </SortableContext>
    </div>
  );
};
export default memo(BoardSection);
