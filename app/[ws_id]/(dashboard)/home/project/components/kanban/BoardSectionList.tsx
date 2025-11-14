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
      <div className="grid grid-flow-col auto-cols-max gap-x-6">
        {Object.keys(boardSections).map((boardSectionKey) => (
          <div className="w-[400px]" key={boardSectionKey}>
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
