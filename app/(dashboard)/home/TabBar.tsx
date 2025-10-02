import { Button, Tabs } from 'antd';
import React from 'react';
import styles from './home.module.css';
import { UserAddOutlined } from '@ant-design/icons';
import Overview from './Overview';

interface ITabBarItem {
  label: string;
  key: string;
  children: React.ReactNode;
}

const listTabs: ITabBarItem[] = [
  {
    label: 'Overview',
    key: 'overview',
    children: <Overview />,
  },
  { label: 'Team', key: 'Team', children: <div>Content of Tab Team</div> },
  {
    label: 'Members',
    key: 'Members',
    children: <div>Content of Tab Members</div>,
  },
  {
    label: 'Project',
    key: 'Project',
    children: <div>Content of Tab Project</div>,
  },
];

const operations = (
  <Button style={{ fontWeight: 500, borderRadius: '15px' }} icon={<UserAddOutlined />}>
    Invite member
  </Button>
);

const TabBar = () => {
  return (
    <Tabs
      tabBarExtraContent={operations}
      items={listTabs}
      className={styles['tab-bar']}
      tabBarStyle={{ borderBottom: 'none' }}
    />
  );
};

export default TabBar;
