import { ChartNoAxesGantt, ChevronDown, ChevronUp, Lock, Unlock } from 'lucide-react';
import { CreateProjectSchemaType } from './schemas/workspace-schema';

const accessOptions = [
  {
    key: 'restricted',
    label: 'Restricted',
    description: [
      'Only directed members can view and edit tasks.',
      'Only administrators can invite members.',
    ],
    value: false,
    icon: Lock,
  },
  {
    key: 'open',
    label: 'Open',
    description: [
      'Anyone can view this project.',
      'Only administrators can invite members.',
      'Only directed members can edit tasks.',
    ],
    icon: Unlock,
    value: true,
  },
];

export default accessOptions;
export type AccessOptionType = (typeof accessOptions)[number];

export const urgencyOptions = [
  // {
  //   label: 'Highest',
  //   value: 'highest',
  //   icon: ChevronsUp,
  //   color: {
  //     bg: '#FFE8E9',
  //     icon: '#F20005',
  //   },
  // },
  {
    label: 'High',
    value: 'high',
    icon: ChevronUp,
    color: {
      bg: '#FFE8E9',
      icon: '#F20005',
    },
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ChartNoAxesGantt,
    color: {
      icon: '#FFBB00',
      bg: '#FFEED4',
    },
  },
  {
    label: 'Low',
    value: 'low',
    icon: ChevronDown,
    color: {
      bg: '#E5F1FF',
      icon: '#005AF4',
    },
  },
  // {
  //   label: 'Lowest',
  //   value: 'lowest',
  //   icon: ChevronsDown,
  //   color: {
  //     bg: '#E5F1FF',
  //     icon: '#005AF4',
  //   },
  // },
];

export const getUrgencyOptions = (urgency: string) => {
  return urgencyOptions.find((item) => item.value === urgency);
};

export const DEFAULT_TASK_LIST: CreateProjectSchemaType['task_list'] = [
  {
    name: 'To Do',
    description: 'Tasks that need to be done',
    color: '#6B7280',
    position: 1,
    is_default: true,
  },
  {
    name: 'In Progress',
    description: 'Tasks currently being worked on',
    color: '#F59E0B',
    position: 2,
    is_default: false,
  },
  {
    name: 'Done',
    description: 'Completed tasks',
    color: '#10B981',
    position: 3,
    is_default: false,
  },
];
export const WORKSPACE_SIZE_OPTIONS = [
  { label: '2-5', value: '5' },
  { label: '6-10', value: '10' },
  { label: '11-20', value: '20' },
  { label: '21-50', value: '50' },
  { label: '51-100', value: '100' },
  { label: '101-250', value: '250' },
  { label: '250+', value: '1000' },
];

export const USER_AVATAR_URL = '/icons/user-circle.svg';
export const PAGE_SIZE = 10;
