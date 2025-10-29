import { ResponseTaskListResponse, ResponseTaskResponse } from '@/app/api/generated.schemas';
import {
  BoardSections,
  findBoardSectionContainer,
  getTaskById,
  initializeBoard,
} from '@/utils/board';
import {
  defaultDropAnimation,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

const useDndKanban = (init_tasks: ResponseTaskResponse[], sections: ResponseTaskListResponse[]) => {
  const [boardSections, setBoardSections] = useState<BoardSections>({});
  const [activeTaskId, setActiveTaskId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    const boardSection = initializeBoard(init_tasks, sections);

    setBoardSections(boardSection);
  }, [init_tasks, sections]);

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex((task) => task.id === active.id);
    const overIndex = boardSections[overContainer].findIndex((task) => task.id === over?.id);

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex),
      }));
    }

    setActiveTaskId(null);
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const currentTask = activeTaskId ? getTaskById(init_tasks, String(activeTaskId)) : null;

  return {
    currentTask,
    dropAnimation,
    handleDragEnd,
    handleDragOver,
    handleDragStart,
    sensors,
    boardSections,
  };
};
export default useDndKanban;
