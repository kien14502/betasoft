import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import useDndKanban from '@/hooks/useDndKanban';
import { useContext, useMemo } from 'react';
import CreateSection from './CreateSection';
import { usePathname } from 'next/navigation';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useGetTaskSections, useMoveTaskKanban } from '@/services/task-service';

type Props = {
  init_tasks: ResponseTaskResponse[];
};

const BoardSectionList: React.FC<Props> = ({ init_tasks }) => {
  const id = usePathname().split('/')[3];
  const { project } = useContext(ProjectContext);
  const { mutate: onMoveTask } = useMoveTaskKanban();
  const { data: sections } = useGetTaskSections(id);

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
  } = useDndKanban(init_tasks, sections || [], async ({ active }) => {
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
    <div style={{ overflow: 'auto hidden' }} className="min-h-0 px-2 pt-4 flex flex-col">
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
              />
            </li>
          ))}
          <DragOverlay dropAnimation={dropAnimation}>
            {currentTask ? <TaskItem task={currentTask} /> : null}
          </DragOverlay>
          <CreateSection taskPosition={sections?.length || 0} />
        </ul>
      </DndContext>
    </div>
  );
};
export default BoardSectionList;
