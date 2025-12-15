import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Task, TaskSection } from '@/interface/task';
import { useMoveTaskKanban } from '@/services/task-service';
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
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

const useDndKanban = (init_tasks: Task[], sections: TaskSection[]) => {
  const [boardSections, setBoardSections] = useState<BoardSections>({});
  const [activeTaskId, setActiveTaskId] = useState<UniqueIdentifier | null>(null);

  // Use ref to track if initial setup is done
  const isInitialized = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // FIX 1: Use ref to store latest values without causing re-renders
  const tasksRef = useRef(init_tasks);
  const sectionsRef = useRef(sections);

  useEffect(() => {
    tasksRef.current = init_tasks;
    sectionsRef.current = sections;
  }, [init_tasks, sections]);

  // FIX 2: Initialize board only once or when data structure changes
  // Use stringified IDs to detect actual changes
  const tasksKey = useMemo(
    () =>
      init_tasks
        .map((t) => t.id)
        .sort()
        .join(','),
    [init_tasks],
  );
  const sectionsKey = useMemo(
    () =>
      sections
        .map((s) => s.id)
        .sort()
        .join(','),
    [sections],
  );

  useEffect(() => {
    const boardSection = initializeBoard(init_tasks, sections);
    setBoardSections(boardSection);
    isInitialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksKey, sectionsKey]); // Only reinitialize when IDs actually change

  // FIX 3: Memoize handlers to prevent recreation
  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    console.log('start');
    setActiveTaskId(active.id);
  }, []);

  const handleDragOver = useCallback(({ active, over }: DragOverEvent) => {
    console.log('over');
    if (!over) return;
    setBoardSections((boardSection) => {
      // Find the containers
      const activeContainer = findBoardSectionContainer(boardSection, active.id as string);
      const overContainer = findBoardSectionContainer(boardSection, over.id as string);

      if (!activeContainer || !overContainer || activeContainer === overContainer) {
        return boardSection;
      }

      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.id === active.id);

      // FIX 4: Correct overIndex calculation (was using !== instead of ===)
      const overIndex = overItems.findIndex((item) => item.id === over.id);

      // If item not found, append to end
      const insertIndex = overIndex === -1 ? overItems.length : overIndex;

      // Remove from active container and add to over container
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
  }, []);

  const handleDragEnd = useCallback((dragEndEvent: DragEndEvent) => {
    const { active, over } = dragEndEvent;

    if (!over) {
      setActiveTaskId(null);
      return;
    }

    setBoardSections((boardSection) => {
      const activeContainer = findBoardSectionContainer(boardSection, active.id as string);
      const overContainer = findBoardSectionContainer(boardSection, over.id as string);

      if (!activeContainer || !overContainer) {
        return boardSection;
      }

      // If dropped in different container, no need to reorder (already handled in dragOver)
      if (activeContainer !== overContainer) {
        return boardSection;
      }

      // If dropped in same container, reorder
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
    console.log('end');
    setActiveTaskId(null);
  }, []);

  const dropAnimation: DropAnimation = useMemo(
    () => ({
      ...defaultDropAnimation,
    }),
    [],
  );

  // FIX 5: Use tasksRef.current instead of init_tasks to avoid dependency issues
  const currentTask = useMemo(
    () => (activeTaskId ? getTaskById(tasksRef.current, String(activeTaskId)) : null),
    [activeTaskId],
  );

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
