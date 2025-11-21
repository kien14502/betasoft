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
    <div style={{ overflow: 'auto hidden' }} className="h-full px-2 pt-4 flex flex-col">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ul className="grid auto-cols-max grid-flow-col gap-x-6 h-full max-h-full flex-1 shrink-0">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <li className="w-[400px] max-h-full h-full flex flex-col" key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
                section={getSection(boardSectionKey)}
              />
            </li>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {currentTask ? <TaskItem task={currentTask} /> : null}
          </DragOverlay>
          <CreateSection />
        </ul>
      </DndContext>
    </div>
  );
};
export default BoardSectionList;
