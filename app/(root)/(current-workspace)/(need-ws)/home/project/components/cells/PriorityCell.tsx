import { RequestUpdateTaskRequestPriority } from '@/app/api/generated.schemas';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getUrgencyOptions, urgencyOptions } from '@/constants/common';
import { Task } from '@/interface/task';
import { cn } from '@/lib/utils';
import { useUpdateTask } from '@/services/task-service';
import { ChevronDown } from 'lucide-react';
import { useContext } from 'react';

type Props = {
  task: Task;
  variant?: 'sm' | 'default';
};

const PriorityCell = ({ task, variant = 'default' }: Props) => {
  const { project } = useContext(ProjectContext);

  const { mutate: updateTask } = useUpdateTask(project?.sprint_active.id ?? '');

  const urgency = getUrgencyOptions(task.priority || '');

  const handleUpdateTask = (value: string) => {
    updateTask({
      project_id: task.project_id || '',
      sprint_id: project?.sprint_active?.id || '',
      task_id: task.id || '',
      priority: value as RequestUpdateTaskRequestPriority,
    });
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
            onClick={() => handleUpdateTask(item.value)}
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
