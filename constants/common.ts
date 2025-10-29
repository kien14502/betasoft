import { Lock, Unlock } from 'lucide-react';
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
