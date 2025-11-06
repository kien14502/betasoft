import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import UrgencyBadge from '@/components/common/UrgencyBadge';
import { Button } from '@/components/ui/button';
import useGrabbing from '@/hooks/useGrabbing';
import { cn } from '@/utils/common';
import Image from 'next/image';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Checkbox } from '@/components/ui/checkbox';
import { memo, useCallback, useState } from 'react';

type TaskItemProps = {
  task: ResponseTaskResponse;
};

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { boardRef, isGrabbing } = useGrabbing();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toggleModal = useCallback(() => setOpenModal(!openModal), [openModal]);

  return (
    <div
      onClick={toggleModal}
      style={{
        cursor: isGrabbing ? 'grabbing' : 'grab',
      }}
      ref={boardRef}
      className={cn(
        'border flex flex-col gap-2 !py-3 !px-4 border-cool-gray-20 shadow-main rounded-md bg-white',
      )}
    >
      <div className="flex items-center gap-2">
        <Checkbox className="rounded-full" />
        <p className="font-semibold text-gray-90 text-sm">{task.title}</p>
        <Button className="ml-auto" variant={'ghost'} size={'icon'}>
          <Image width={20} height={20} src={'/icons/dots.svg'} alt={''} />
        </Button>
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
          <span className="text-sm font-medium">{task.due_date}</span>
        </div>
        <UrgencyBadge value={task.priority ?? ''} />
      </div>
    </div>
  );
};
export default memo(TaskItem);
