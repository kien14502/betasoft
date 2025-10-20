'use client';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../tasks.module.css';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import KanbanCol from './KanbanCol';
import KanbanTask from './KanbanTask';
import { useStore } from '@/store/hooks';
import { actions } from '@/store';

export type Column = {
  title: string;
  key: string;
  quantityTask: number;
};

export type Task = {
  title: string;
  key: string;
  content?: string;
  state: string;
};

const columnsInit = [
  {
    title: 'To do',
    key: 'todo',
    quantityTask: 5,
  },
  {
    title: 'Pending',
    key: 'pending',
    quantityTask: 5,
  },
  {
    title: 'Done',
    key: 'done',
    quantityTask: 5,
  },
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(columnsInit);
  const [activeCol, setActiveCol] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.key), [columns]);

  const [state, dispatch] = useStore();
  const { kanban } = state;
  const { tasks } = kanban;

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveCol(event.active.data.current.col);
      return;
    }

    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveCol(null);
    setActiveTask(null);

    const { active, over } = event;
    const activeColId = active.id;
    const overColId = over?.id;

    // Disable drag col
    if (active.data.current?.type === 'Column') return;

    if (activeColId === overColId) return;

    /*setColumns((columns) => {
      const activeColIdx = columns.findIndex((col) => col.key === activeColId);

      const overColumnIdx = columns.findIndex((col) => col.key === overColId);

      return arrayMove(columns, activeColIdx, overColumnIdx);
    });*/
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // dropping a  Task over another Task

    if (isActiveATask && isOverATask) {
      const activeIndex = tasks.findIndex((t) => t.key === activeId);
      const overIndex = tasks.findIndex((t) => t.key === overId);
      tasks[activeIndex].state = tasks[overIndex].state;
      const newTasks = arrayMove(tasks, activeIndex, overIndex);
      dispatch(actions.setTasks(newTasks));
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // dropping a Task over a column

    if (isActiveATask && isOverAColumn) {
      const activeIndex = tasks.findIndex((t) => t.key === activeId);
      if (activeIndex === -1) return tasks;
      const newTasks = tasks.map((task, idx) =>
        idx === activeIndex ? { ...task, state: overId as string } : task,
      );
      dispatch(actions.setTasks(newTasks));
    }
  }

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <div className={styles['kanban-board']}>
        {/* <SortableContext items={columnsId}> */}
        {columns.map((col) => (
          <KanbanCol
            key={col.key}
            col={col}
            tasks={tasks.filter((task) => task.state === col.key)}
          />
        ))}
        {/* </SortableContext> */}
      </div>
      <DragOverlay>
        {/* {activeCol && <KanbanCol tasks={tasks} col={activeCol} />} */}
        {activeTask && <KanbanTask task={activeTask} />}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
