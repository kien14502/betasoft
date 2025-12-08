import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import useDndKanban from '@/hooks/useDndKanban';
import { useContext, useMemo, useRef } from 'react';
import CreateSection from './CreateSection';
import { usePathname } from 'next/navigation';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useGetTask, useGetTaskSections, useMoveTaskKanban } from '@/services/task-service';

const BoardSectionList: React.FC = () => {
  const id = usePathname().split('/')[3];
  const { data: init_tasks } = useGetTask(id);
  const { project } = useContext(ProjectContext);
  const { mutate: onMoveTask, isPending } = useMoveTaskKanban();
  const { data: sections } = useGetTaskSections(id);
  const ref = useRef<HTMLDivElement>(null);

  const getSection = useMemo(
    () => (key: string) => {
      return sections?.find((item) => item.id === key);
    },
    [sections],
  );

  const scrollRight = () => {
    ref.current?.scrollTo({
      left: ref.current.scrollWidth,
      behavior: 'smooth',
    });
  };

  const {
    currentTask,
    boardSections,
    dropAnimation,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    sensors,
  } = useDndKanban(init_tasks?.tasks || [], sections || [], async ({ active }) => {
    const { containerId, index } = active.data.current?.sortable || {};
    const payload = {
      project_id: id,
      task_id: active.id.toString(),
      sprint_id: project?.sprint_active?.id || '',
      target_list_id: containerId || '',
      target_position: index + 1,
    };
    onMoveTask(payload);
  });

  return (
    <div
      ref={ref}
      style={{ overflow: 'auto hidden' }}
      className="min-h-0 px-2 pt-4 flex flex-col pb-6"
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ul className="grid auto-cols-max grid-flow-col gap-x-6 flex-1 min-h-0">
          {Object.keys(boardSections).map((boardSectionKey) => (
            <li className="w-[400px] flex-1 min-h-0 flex flex-col" key={boardSectionKey}>
              <BoardSection
                id={boardSectionKey}
                tasks={boardSections[boardSectionKey]}
                section={getSection(boardSectionKey)}
                isPending={isPending}
              />
            </li>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {currentTask ? <TaskItem task={currentTask} /> : null}
          </DragOverlay>
          <li className="w-[400px] flex-1 min-h-0 flex flex-col">
            <CreateSection onScrollRight={scrollRight} taskPosition={sections?.length || 0} />
          </li>
        </ul>
      </DndContext>
    </div>
  );
};
export default BoardSectionList;
