import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import useDndKanban from '@/hooks/useDndKanban';
import { useContext, useMemo } from 'react';
import CreateSection from './CreateSection';
import { usePathname } from 'next/navigation';
import { useGetAuthTaskListsProjectId } from '@/app/api/task-list/task-list';
import { axios } from '@/config/axios';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useMutation } from '@tanstack/react-query';

type Props = {
  init_tasks: ResponseTaskResponse[];
};

interface TaskDetails {
  project_id: string;
  task_id: string;
  sprint_id: string;
  target_list_id: string;
  target_position: number;
}

const handleMonveTask = async (payload: TaskDetails) => {
  const res = await axios.put('auth/tasks/move', payload);
  return res.data;
};

const BoardSectionList: React.FC<Props> = ({ init_tasks }) => {
  const id = usePathname().split('/')[3];
  const { project } = useContext(ProjectContext);
  const { mutate: onMoveTask } = useMutation({
    mutationFn: handleMonveTask,
  });

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
          <CreateSection />
        </ul>
      </DndContext>
    </div>
  );
};
export default BoardSectionList;
