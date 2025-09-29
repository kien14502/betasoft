'use client';
import React from 'react';
import { Task } from './KanbanBoard';
import styles from '../tasks.module.css';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  AntDesignOutlined,
  CalendarOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileImageOutlined,
  MessageOutlined,
  PaperClipOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Tag, Tooltip } from 'antd';
import { actions, useStore } from '@/app/store';

interface IKanbanTask {
  task: Task;
}

const KanbanTask = ({ task }: IKanbanTask) => {
  const [_, dispatch] = useStore();
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.key,
    data: {
      type: 'Task',
      task,
    },
  });

  const styleCus = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={styleCus}
      {...attributes}
      className={`${styles['task']} ${isDragging ? styles['task-dragging'] : ''}`}
    >
      <div {...listeners} className={`${styles['task-header']}`}>
        <CalendarOutlined /> Jul 28, 2025
      </div>
      <div className={`${styles['task-body']}`}>
        <div className={`${styles['task-body-top']}`}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div className={`${styles['task-header-title']}`}>{task.title}</div>
            <Tag color="magenta">important</Tag>
          </div>
          <div>
            <EllipsisOutlined style={{ cursor: 'pointer' }} />{' '}
            <EditOutlined
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                dispatch(actions.setModeTask('edit'));
                dispatch(actions.setTask(task));
                dispatch(actions.setActiveModalAddTask(true));
              }}
            />
          </div>
        </div>
        <div className={`${styles['task-body-main']}`}>{task.content}</div>
      </div>
      <div className={`${styles['task-footer']}`}>
        <div>
          <Avatar.Group
            size={'small'}
            max={{
              count: 2,
              style: { color: '#f56a00', backgroundColor: '#fde3cf' },
            }}
          >
            <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            <Tooltip title="Ant User" placement="top">
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Tooltip>
            <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
          </Avatar.Group>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', color: '#575757ff' }}>
          <div>
            4 <FileImageOutlined />
          </div>
          <div>
            2{''}
            <PaperClipOutlined />
          </div>
          <div>
            1 <MessageOutlined />
          </div>
        </div>
      </div>
      <div className={`${styles['task-footer']}`}>
        <div style={{ color: '#a7a7a7ff' }}>Project</div>
        <div>Invoice Maker</div>
      </div>
    </div>
  );
};

export default KanbanTask;
