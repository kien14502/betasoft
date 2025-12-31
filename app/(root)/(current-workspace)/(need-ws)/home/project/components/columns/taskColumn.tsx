import { ColumnDef } from '@tanstack/react-table';
import {
  AlarmClock,
  Bookmark,
  ChartNoAxesGantt,
  ChevronsUp,
  CircleDashed,
  PanelRightOpen,
  UserRound,
} from 'lucide-react';
import TaskCellAction from '../cells/TaskCellAction';
import { USER_AVATAR_URL } from '@/constants/common';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import StatusCell from '../cells/StatusCell';
import PriorityCell from '../cells/PriorityCell';

import { Button } from '@/components/ui/button';
import { useCallback, useContext } from 'react';
import { ModalTaskTableContext } from '../../providers/ModalTaskTableProvider';
import { Task } from '@/interface/task';
import { ArrowDown2 } from 'iconsax-reactjs';
import { cn } from '@/lib/utils';
import { fDate } from '@/utils/dayjs';

const taskColumn = (isSubtask: boolean = false): ColumnDef<Task>[] => {
  return [
    {
      id: 'expander',
      header: () => null,
      cell: ({ row }) => {
        if (isSubtask) {
          return null;
        }
        const isCanExpand = row.original.sub_tasks.length > 0;
        return isCanExpand ? (
          <Button
            {...{
              className: 'size-7 text-muted-foreground',
              onClick: row.getToggleExpandedHandler(),
              'aria-expanded': row.getIsExpanded(),
              'aria-label': row.getIsExpanded()
                ? `Collapse details for ${row.original.id}`
                : `Expand details for ${row.original.id}`,
              size: 'icon',
              variant: 'ghost',
            }}
          >
            <ArrowDown2
              className={cn(row.getIsExpanded() ? 'rotate-180' : '', 'transition-transform')}
              size="32"
              variant="Bold"
            />
          </Button>
        ) : undefined;
      },
      size: 16,
      maxSize: 16,
      minSize: 16,
    },
    {
      accessorKey: 'title',
      header: () => (
        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
          <ChartNoAxesGantt size={20} />
          Tasks
        </div>
      ),
      cell: ({ row, table }) => {
        const original = row.original;
        const subTasks = original?.sub_tasks || [];

        const isLastSubtask =
          table.getCoreRowModel().rows.findIndex((item) => item.original.id === row.original.id) <
          subTasks.length - 2;

        return (
          <div className={cn('flex items-center gap-1.5 group relative', isSubtask && 'pl-10')}>
            {isSubtask && (
              <>
                <div className="absolute left-0 -top-6 ml-1">
                  <Image width={24} height={35} src={'/icons/sub-arrow.svg'} alt="" />
                </div>
                {!isLastSubtask && (
                  <div className="w-[1px] h-16 -top-6 left-1 absolute bg-[#D1D1D6] last:hidden" />
                )}
              </>
            )}

            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
              className="rounded-full"
            />

            <div className="flex items-center gap-4">
              <div className="text-sm  font-medium line-clamp-1 max-w-[250px] overflow-hidden text-ellipsis">
                {original.title}
              </div>
              {subTasks.length > 0 && (
                <div className="flex items-center gap-2 text-sm  text-gray-4">
                  <Image src={'/icons/arrow-turn-down-right.svg'} width={16} height={16} alt="" />
                  {subTasks.filter((item) => item.completed).length}/{subTasks.length}
                </div>
              )}
            </div>

            {!isSubtask && <ButtonModal task={original} />}
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
        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
          <CircleDashed size={20} />
          Status
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-end w-full">
          <StatusCell task={row.original} />
        </div>
      ),
      size: 100,
      maxSize: 100,
      minSize: 100,
    },

    {
      accessorKey: 'assignee',
      header: () => (
        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
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
        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
          <ChevronsUp size={20} />
          Priority
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-end w-full">
          <PriorityCell task={row.original} />
        </div>
      ),
      size: 80,
      maxSize: 80,
      minSize: 80,
    },
    {
      accessorKey: 'due_date',
      header: () => (
        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
          <AlarmClock size={20} />
          Due date
        </div>
      ),
      cell: ({ row }) => {
        const date = fDate(row.original.created_at);
        return <div>{date?.toISOString()}</div>;
      },
      size: 100,
      maxSize: 100,
      minSize: 100,
    },
    {
      accessorKey: 'reporter',
      header: () => (
        <div className="flex items-center gap-1.5 text-white text-xs font-medium">
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

const ButtonModal = ({ task }: { task: Task }) => {
  const { isShowModal, setShowModal, setContent } = useContext(ModalTaskTableContext);

  const toggle = useCallback(() => {
    setShowModal(!isShowModal);
    setContent(task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowModal]);

  return (
    <Button
      onClick={toggle}
      size={'icon'}
      variant={'outline'}
      className="absolute hidden group-hover:flex right-2"
    >
      <PanelRightOpen size={20} />
    </Button>
  );
};
