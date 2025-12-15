import { CalendarIcon, ChannelIcon, DocumentIcon, HomeIcon, TaskIcon } from '@/components/icons';
import { CHAT_TYPE } from './common';

export const GLOBAL = 'global';

export const mainRoutes = [
  { label: 'Home', path: '/home', icon: HomeIcon },
  { label: 'Tasks', path: '/tasks', icon: TaskIcon },
  { label: 'Chat', path: '/channels', icon: ChannelIcon },
  { label: 'Docs', path: '/documents', icon: DocumentIcon },
  { label: 'Calendar', path: '/calendar', icon: CalendarIcon },
];

export const homeRoutes = [
  { name: 'Overview', path: 'overview' },
  { name: 'Project', path: 'project' },
  { name: 'Team', path: 'team' },
  { name: 'Members', path: 'members' },
];

export const projectRoutes = [
  { name: 'Summary', path: 'summary', icon: '/icons/pie-chart-fill.svg' },
  { name: 'Tasks', path: 'tasks-project', icon: '/icons/task-fill.svg' },
  { name: 'Document', path: 'document', icon: '/icons/docs-fill.svg' },
  { name: 'Calendar', path: 'calendar', icon: '/icons/calendar-fill.svg' },
];

export const channelRoutes = [
  {
    name: 'DMs',
    path: CHAT_TYPE.DMS,
  },
  {
    name: 'Group',
    path: CHAT_TYPE.GROUP,
  },
  {
    name: 'Project',
    path: CHAT_TYPE.PROJECT,
  },
  {
    name: 'Global',
    path: CHAT_TYPE.GLOBAL,
  },
];
