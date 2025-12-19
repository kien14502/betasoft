import { Task, TaskSection } from '@/interface/task';
import { BoardSections, getTaskById, initializeBoard } from '@/utils/board';
import {
  UniqueIdentifier,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useEffect, useMemo, useRef, useState } from 'react';

const useKanbanV2 = (init_tasks: Task[], sections: TaskSection[]) => {
  const [boardSections, setBoardSections] = useState<BoardSections>({});
  const [activeTaskId, setActiveTaskId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const isInitialized = useRef(false);

  const tasksRef = useRef(init_tasks);
  const sectionsRef = useRef(sections);

  useEffect(() => {
    tasksRef.current = init_tasks;
    sectionsRef.current = sections;
  }, [init_tasks, sections]);

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

  useEffect(() => {
    const boardSection = initializeBoard(init_tasks, sections);
    setBoardSections(boardSection);
    isInitialized.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasksKey, sectionsKey, init_tasks]);

  return {
    setActiveTaskId,
    currentTask,
    dropAnimation,
    sensors,
    boardSections,
    setBoardSections,
  };
};
export default useKanbanV2;
