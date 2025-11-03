import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { ResponseTaskListResponse, ResponseTaskResponse } from '@/app/api/generated.schemas';
import useDndKanban from '@/hooks/useDndKanban';
import { useMemo } from 'react';
import Image from 'next/image';
import { usePostAuthTasks } from '@/app/api/task/task';

type Props = {
  init_tasks: ResponseTaskResponse[];
  sections: ResponseTaskListResponse[];
};

const BoardSectionList: React.FC<Props> = ({ init_tasks, sections }) => {
  const {
    currentTask,
    boardSections,
    dropAnimation,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    sensors,
  } = useDndKanban(init_tasks, sections);

  const { mutate: createTask } = usePostAuthTasks();

  const getSection = useMemo(
    () => (key: string) => {
      return sections.find((item) => item.id === key);
    },
    [sections],
  );

  const handleCreateTask = () => {
    createTask({
      data: {
        list_id: '',
        sprint_id: '',
        title: '',
        project_id: '',
      },
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-start gap-4 h-full flex-1 overflow-x-auto">
        {Object.keys(boardSections).map((boardSectionKey) => (
          <div
            className="bg-bg-secondary h-fit shrink-0 p-4 rounded-md w-full max-w-[400px]"
            key={boardSectionKey}
          >
            <BoardSection
              id={boardSectionKey}
              tasks={boardSections[boardSectionKey]}
              section={getSection(boardSectionKey)}
            />
          </div>
        ))}
        <DragOverlay dropAnimation={dropAnimation}>
          {currentTask ? <TaskItem task={currentTask} /> : null}
        </DragOverlay>
        <button className="p-2.5 shrink-0 rounded-xl bg-bg-secondary active:scale-95">
          <Image src={'/icons/plus.svg'} width={20} height={20} alt={''} />
        </button>
      </div>
    </DndContext>
  );
};
export default BoardSectionList;
