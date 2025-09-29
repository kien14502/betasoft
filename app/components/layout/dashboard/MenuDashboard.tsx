import {
  CalendarOutlined,
  CommentOutlined,
  FolderOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import React from 'react';
import styles from './dashboard.module.css';
import Link from 'next/link';
import { actions, useStore } from '@/app/store';

interface IMenuItem {
  label: string;
  index: string;
  path: string;
  icon?: React.ReactNode;
  children?: IMenuItem[] | null;
}

function MenuDashboard() {
  const [{ menu }, dispatch] = useStore();
  const setCurrentMenu = (key: string) => {
    dispatch(actions.setActiveMenu(key));
  };
  const items: IMenuItem[] = [
    {
      label: 'Home',
      index: 'home',
      path: '/home',
      icon: <HomeOutlined />,
    },
    {
      label: 'Tasks',
      index: 'tasks',
      path: '/tasks',
      icon: <OrderedListOutlined />,
    },
    {
      label: 'Channels',
      index: 'channels',
      path: '/channels',
      icon: <CommentOutlined />,
    },
    {
      label: 'Documents',
      index: 'documents',
      path: '/documents',
      icon: <FolderOutlined />,
    },
    {
      label: 'Calendar',
      index: 'Calendar',
      path: '/calendar',
      icon: <CalendarOutlined />,
      children: [
        {
          label: 'Item 1',
          index: 'g1',
          path: '/calendar/1',
          children: [{ label: 'Option 1', index: 'setting:1', path: '/setting/1' }],
        },
        {
          label: 'Item 2',
          index: 'g2',
          path: '/setting/2',
        },
      ],
    },
  ];

  const MenuItem = (item: IMenuItem) => (
    <Link
      href={item.path}
      className={`${styles['menu-item']} ${menu.activeMenuKey === item.index ? styles['menu-item-active'] : ''}`}
      onClick={() => setCurrentMenu(item.index)}
    >
      <div>{item.icon}</div>
      <div>{item.label}</div>
    </Link>
  );

  return (
    <div className={styles['menu-wrapper']}>
      {items.map((item) => (
        <MenuItem key={item.index} {...item} />
      ))}
    </div>
  );
}

export default MenuDashboard;
