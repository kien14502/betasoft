'use client';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React, { useMemo } from 'react';
import styles from '../tasks.module.css';
import { Column, Task } from './KanbanBoard';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { actions, useStore } from '@/app/store';
import KanbanTask from './KanbanTask';

interface IKanbanCol {
  col: Column;
  tasks: Task[];
}

const KanbanCol = ({ col, tasks }: IKanbanCol) => {
  const [_, dispatch] = useStore();
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: col.key,
    data: {
      type: 'Column',
      col,
    },
  });

  const styleCus = {
    transition,
    transform: CSS.Transform.toString(transform),
    minwidth: '300px',
    minHeight: '300px',
    fontWeight: '600',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  };

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.key);
  }, [tasks]);

  return (
    <div
      ref={setNodeRef}
      // style={styleCus}
      className={`${styles['kanban-col']} ${isDragging ? styles['kanban-col-dragging'] : ''}`}
    >
      <div
        // {...attributes}
        // {...listeners}
        className={styles['kanban-col-header']}
      >
        <div>
          {col.title} <Badge count={col.quantityTask} />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <PlusOutlined style={{ cursor: 'pointer' }} />
          <EllipsisOutlined style={{ cursor: 'pointer' }} />
        </div>
      </div>
      <div className={styles['kanban-col-body']}>
        <div className={styles['list-task']}>
          <SortableContext items={tasksIds}>
            {tasks.map((task) => (
              <KanbanTask key={task.key} task={task} />
            ))}
          </SortableContext>
        </div>
      </div>
      <div
        className={styles['kanban-col-footer']}
        onClick={() => {
          dispatch(actions.setModeTask('add'))
          dispatch(actions.setStateTask(col.key));
          dispatch(actions.setActiveModalAddTask(true));
        }}
      >
        <PlusOutlined style={{ cursor: 'pointer' }} />
        <span>New Task</span>
      </div>
    </div>
  );
};

export default KanbanCol;
