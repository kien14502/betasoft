import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import useDndKanban from '@/hooks/useDndKanban';
import { useMemo } from 'react';
import CreateSection from './CreateSection';
import { usePathname } from 'next/navigation';
import { useGetAuthTaskListsProjectId } from '@/app/api/task-list/task-list';

type Props = {
  init_tasks: ResponseTaskResponse[];
};

const BoardSectionList: React.FC<Props> = ({ init_tasks }) => {
  const id = usePathname().split('/')[4];
  const { data: sections } = useGetAuthTaskListsProjectId(id, {
    query: { select: (data) => data.data || [] },
  });

  const getSection = useMemo(
    () => (key: string) => {
      return sections?.find((item) => item.id === key);
    },
    [sections],
  );

  const {
    currentTask,
    boardSections,
    dropAnimation,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    sensors,
  } = useDndKanban(init_tasks, sections || []);

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
            className="bg-bg-secondary ease-in-out transition-[height] duration-300 h-fit shrink-0 p-4 rounded-md w-full max-w-[400px]"
            key={boardSectionKey}
            style={{
              minHeight: 'fit-content',
              height: 'auto',
            }}
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
        <CreateSection />
      </div>
    </DndContext>
  );
};
export default BoardSectionList;
