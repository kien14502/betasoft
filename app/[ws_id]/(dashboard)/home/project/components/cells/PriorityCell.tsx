import {
  RequestUpdateTaskRequestPriority,
  ResponseTaskResponse,
} from '@/app/api/generated.schemas';
import { usePatchAuthTasks } from '@/app/api/task/task';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getUrgencyOptions, urgencyOptions } from '@/constants/common';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import { useState } from 'react';

type Props = {
  task: ResponseTaskResponse;
  variant?: 'sm' | 'default';
};

const PriorityCell = ({ task, variant = 'default' }: Props) => {
  const { project } = useContext(ProjectContext);

  const { mutate: udpateTask } = usePatchAuthTasks();
  const [currentPriority, setCurrentPriority] = useState<string>(task.priority || '');

  const urgency = getUrgencyOptions(currentPriority);

  const handleUpadteTask = (value: string) => {
    udpateTask(
      {
        data: {
          project_id: task.project_id || '',
          sprint_id: project?.sprint_active?.id || '',
          task_id: task.id || '',
          priority: value as RequestUpdateTaskRequestPriority,
        },
      },
      {
        onSuccess: (data) => {
          setCurrentPriority(data.data?.priority || '');
        },
      },
    );
  };

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-1">
          <div
            style={{
              background: urgency?.color.bg,
            }}
            className={cn(
              'flex items-center w-fit p-2 rounded-xl gap-2',
              variant === 'sm' && 'py-1 px-2 rounded-xl',
            )}
          >
            {urgency?.icon && (
              <urgency.icon size={variant === 'sm' ? 14 : 16} color={urgency.color.icon} />
            )}
            <span className={cn('text-sm font-medium', variant === 'sm' && 'text-xs font-medium')}>
              {urgency?.label}
            </span>
          </div>
          <ChevronDown size={24} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-none py-2">
        {urgencyOptions.map((item) => (
          <div
            onClick={() => handleUpadteTask(item.value)}
            className="py-2 px-3 group relative hover:bg-gray-1"
            key={item.value}
          >
            <div
              style={{
                background: item?.color.bg,
              }}
              className="flex items-center w-fit py-1 px-2 text-xs rounded-xl gap-2"
            >
              {urgency?.icon && <urgency.icon size={16} color={item.color.icon} />}
              <span className={cn('text-sm font-medium')}>{item?.label}</span>
            </div>
            <div className="hidden absolute group-hover:block w-0.5 h-full top-0 left-0 bg-blue-4" />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default PriorityCell;
