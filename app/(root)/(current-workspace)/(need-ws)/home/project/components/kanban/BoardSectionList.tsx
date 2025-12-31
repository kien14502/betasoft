import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import BoardSection from './BoardSection';
import TaskItem from './TaskItem';
import { useContext, useMemo, useRef } from 'react';
import CreateSection from './CreateSection';
import { useGetTaskSections, useMoveTaskKanban } from '@/services/task-service';
import useKanbanV2 from '@/hooks/useKanbanV2';
import { findBoardSectionContainer } from '@/utils/board';
import { arrayMove } from '@dnd-kit/sortable';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Task } from '@/interface/task';

type Props = {
  id: string;
  tasks: Task[];
};

const BoardSectionList: React.FC<Props> = ({ id, tasks }) => {
  const { project } = useContext(ProjectContext);
  const { mutate: onMoveTask } = useMoveTaskKanban();
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

  const { boardSections, currentTask, dropAnimation, sensors, setActiveTaskId, setBoardSections } =
    useKanbanV2(tasks, sections ?? []);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id);
  };
  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    setBoardSections((boardSection) => {
      const activeContainer = findBoardSectionContainer(boardSection, active.id as string);
      const overContainer = findBoardSectionContainer(boardSection, over.id as string);

      if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return boardSection;
      }

      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];
      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id === over.id);
      const insertIndex = overIndex === -1 ? overItems.length : overIndex;

      return {
        ...boardSection,
        [activeContainer]: activeItems.filter((item) => item.id !== active.id),
        [overContainer]: [
          ...overItems.slice(0, insertIndex),
          activeItems[activeIndex],
          ...overItems.slice(insertIndex),
        ],
      };
    });
  };
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveTaskId(null);
      return;
    }

    console.log({ active, over });

    setBoardSections((boardSection) => {
      const activeContainer = findBoardSectionContainer(boardSection, active.id as string);
      const overContainer = findBoardSectionContainer(boardSection, over.id as string);

      if (!activeContainer || !overContainer) {
        return boardSection;
      }
      if (activeContainer !== overContainer) {
        return boardSection;
      }
      const activeIndex = boardSection[activeContainer].findIndex((task) => task.id === active.id);
      const overIndex = boardSection[overContainer].findIndex((task) => task.id === over.id);

      if (activeIndex !== overIndex) {
        return {
          ...boardSection,
          [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex),
        };
      }

      return boardSection;
    });
    setActiveTaskId(null);

    const { containerId } = active.data.current?.sortable || {};
    const { index: overId } = over.data.current?.sortable || {};

    const payload = {
      project_id: id,
      task_id: active.id.toString(),
      sprint_id: project?.sprint_active?.id || '',
      target_list_id: containerId || '',
      target_position: overId + 1,
    };
    onMoveTask(payload);
  };

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
              />
            </li>
          ))}
          <DragOverlay className="z-50!" dropAnimation={dropAnimation}>
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
