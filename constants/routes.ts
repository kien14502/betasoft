import { IMenuItem } from '../interface/common';
import {
  CalendarOutlined,
  CommentOutlined,
  FolderOutlined,
  HomeOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

export const mainRoutes: IMenuItem[] = [
  {
    label: 'Home',
    index: 'home',
    path: '/home',
    icon: HomeOutlined,
  },
  {
    label: 'Tasks',
    index: 'tasks',
    path: '/tasks',
    icon: OrderedListOutlined,
  },
  {
    label: 'Channels',
    index: 'channels',
    path: '/channels',
    icon: CommentOutlined,
  },
  {
    label: 'Documents',
    index: 'documents',
    path: '/documents',
    icon: FolderOutlined,
  },
  {
    label: 'Calendar',
    index: 'Calendar',
    path: '/calendar',
    icon: CalendarOutlined,
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

export const homeRoutes = [
  { name: 'Overview', path: '/overview' },
  { name: 'Project', path: '/project' },
  { name: 'Team', path: '/team' },
  { name: 'Members', path: '/members' },
];
