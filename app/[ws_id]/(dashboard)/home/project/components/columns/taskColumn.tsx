import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import { ColumnDef } from '@tanstack/react-table';
import {
  AlarmClock,
  Bookmark,
  ChartNoAxesGantt,
  ChevronsUp,
  CircleDashed,
  UserRound,
} from 'lucide-react';
import TaskCellAction from '../cells/TaskCellAction';
import { USER_AVATAR_URL } from '@/constants/common';
import Image from 'next/image';
import { fDate } from '@/utils/dayjs';
import { Checkbox } from '@/components/ui/checkbox';
import StatusCell from '../cells/StatusCell';
import PriorityCell from '../cells/PriorityCell';

import dynamic from 'next/dynamic';

const TaskDetailSheet = dynamic(() => import('../modals/TaskDetailSheet'), {
  ssr: false,
});

const taskColumn = (): ColumnDef<ResponseTaskResponse>[] => {
  return [
    {
      accessorKey: 'title',
      header: () => (
        <div className="flex items-center gap-1.5 text-gray-8 text-xs font-medium">
          <ChartNoAxesGantt size={20} />
          Tasks
        </div>
      ),
      cell: ({ row }) => {
        const original = row.original;
        return (
          <div className="flex items-center gap-1.5 group relative">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="rounded-full"
            />
            <div className="text-sm font-medium line-clamp-1 max-w-[250px] overflow-hidden text-ellipsis">
              {original.title}
            </div>
            <TaskDetailSheet task={original} />
          </div>
        );
      },
      size: 250,
      maxSize: 250,
      minSize: 250,
    },
    {
      accessorKey: 'status',
      header: () => (
        <div className="flex items-center gap-1.5 text-gray-8 text-xs font-medium">
          <CircleDashed size={20} />
          Status
        </div>
      ),
      cell: ({ row }) => <StatusCell task={row.original} />,
      size: 100,
      maxSize: 100,
      minSize: 100,
    },

    {
      accessorKey: 'assignee',
      header: () => (
        <div className="flex items-center gap-1.5 text-gray-8 text-xs font-medium">
          <UserRound size={20} />
          Assignee
        </div>
      ),
      cell: ({ row }) => {
        const original = row.original;
        const assignee = original.assignee;
        return (
          <div className="flex items-center gap-2">
            <Image
              src={assignee?.profile_image || USER_AVATAR_URL}
              alt={''}
              width={32}
              height={32}
            />
            <span className="text-sm font-medium">{assignee?.full_name}</span>
          </div>
        );
      },
      size: 150,
      maxSize: 150,
      minSize: 150,
    },
    {
      accessorKey: 'priority',
      header: () => (
        <div className="flex items-center gap-1.5 text-gray-8 text-xs font-medium">
          <ChevronsUp size={20} />
          Priority
        </div>
      ),
      cell: ({ row }) => <PriorityCell task={row.original} />,
      size: 80,
      maxSize: 80,
      minSize: 80,
    },
    {
      accessorKey: 'due_date',
      header: () => (
        <div className="flex items-center gap-1.5 text-gray-8 text-xs font-medium">
          <AlarmClock size={20} />
          Due date
        </div>
      ),
      cell: ({ row }) => {
        const date = fDate(row.original.due_date);
        return <div>{date?.getDate()}</div>;
      },
      size: 100,
      maxSize: 100,
      minSize: 100,
    },
    {
      accessorKey: 'reporter',
      header: () => (
        <div className="flex items-center gap-1.5 text-gray-8 text-xs font-medium">
          <Bookmark size={20} />
          Reporter
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Image src={USER_AVATAR_URL} alt={''} width={32} height={32} />
            <span className="text-sm font-medium">{row.original.reporter?.full_name}</span>
          </div>
        );
      },
      size: 150,
      maxSize: 150,
      minSize: 150,
    },
    {
      id: 'actions',
      cell: () => (
        <div className="w-full flex items-end justify-end">
          <TaskCellAction />
        </div>
      ),
      size: 50,
      maxSize: 50,
      minSize: 50,
    },
  ];
};
export default taskColumn;
