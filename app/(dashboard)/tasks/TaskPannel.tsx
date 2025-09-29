import { EllipsisOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Tabs } from 'antd';
import Image from 'next/image';
import React from 'react';
import styles from './tasks.module.css';
import TaskKanban from './TaskKanban';
import { actions, useStore } from '@/app/store';

interface ITabBarItem {
  label: string;
  key: string;
  children: React.ReactNode;
}

const listTabs: ITabBarItem[] = [
  {
    label: 'Summary',
    key: 'summary',
    children: <div>Content of Tab Summary</div>,
  },
  { label: 'Tasks', key: 'tasks', children: <TaskKanban /> },
  {
    label: 'Documents',
    key: 'documents',
    children: <div>Content of Tab Documents</div>,
  },
  {
    label: 'Members',
    key: 'members',
    children: <div>Content of Tab Members</div>,
  },
];

const TaskPannel = () => {
  const [{ kanban }, dispatch] = useStore();
  return (
    <Tabs
      items={listTabs}
      className={styles['tab-bar']}
      defaultActiveKey="tasks"
      tabBarExtraContent={{
        left: (
          <div style={{ fontWeight: 700, fontSize: 'large' }}>
            <Image src={'/logo-mini.png'} alt="logo" width={20} height={20} /> All Tasks{'  '}
            <EllipsisOutlined />
          </div>
        ),
        right: (
          <div>
            <Button
              style={{
                borderRadius: '20px',
                backgroundColor: '#e4e4e4',
                padding: 16,
              }}
              onClick={() => {
                dispatch(actions.setModeTask('add'));
                dispatch(actions.setStateTask('todo'));
                dispatch(actions.setActiveModalAddTask(true));
              }}
            >
              <PlusCircleFilled />
              <span style={{ fontWeight: 600 }}>New Task</span>
            </Button>
          </div>
        ),
      }}
      style={{ height: '93%', padding: '0.5rem', marginLeft: '0.5rem', backgroundColor: 'white' }}
    />
  );
};

export default TaskPannel;
