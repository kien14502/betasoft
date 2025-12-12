import UrgencyBadge from '@/components/common/UrgencyBadge';
import useGrabbing from '@/hooks/useGrabbing';
import { cn } from '@/utils/common';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { memo } from 'react';
import { Task } from '@/interface/task';
import TaskAction from './TaskAction';
import { useToggle } from '@/hooks/useToggle';
import TaskDetailSheet from '../modals/TaskDetailSheet';

type TaskItemProps = {
  task: Task;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { boardRef, isGrabbing } = useGrabbing();
  const [openModal, { toggle }] = useToggle();

  return (
    <>
      <div
        onClick={toggle}
        style={{
          cursor: isGrabbing ? 'grabbing' : 'grab',
          boxShadow: '0px 0px 4px 0px hsla(0, 0%, 0%, 0.2)',
        }}
        ref={boardRef}
        className={cn(
          'border flex flex-col gap-2 py-3 px-4 border-cool-gray-20 rounded-2xl bg-white',
        )}
      >
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Checkbox className="rounded-full" />
            <p className="font-semibold text-gray-90 text-sm">{task.title}</p>
          </div>
          <TaskAction />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-8">Assignee:</span>
          <Tooltip>
            <TooltipTrigger>
              <Image
                className="object-center rounded-full"
                src={task.assignee?.profile_image ?? '/icons/user-circle.svg'}
                width={24}
                height={24}
                alt={''}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{task.assignee?.full_name ?? 'Unassigned'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-100 gap-2">
            <Image width={16} height={16} src={'/icons/calendar.svg'} alt="" />
            {/* <span className="text-sm font-medium">{task.due_reminder}</span> */}
          </div>
          <UrgencyBadge value={task.priority ?? ''} />
        </div>
      </div>
      <TaskDetailSheet isShowModal={openModal} task={task} toggle={toggle} />
    </>
  );
};
export default memo(TaskItem);
