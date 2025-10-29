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
