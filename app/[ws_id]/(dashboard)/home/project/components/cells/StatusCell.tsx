import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { useContext } from 'react';
import StatusBadge from '../StatusBadge';
import { usePatchAuthTasks } from '@/app/api/task/task';
import { useMemo } from 'react';
import { TasksContext } from '@/components/providers/TasksProvider';

type Props = {
  task: ResponseTaskResponse;
};

const StatusCell = ({ task }: Props) => {
  const { project } = useContext(ProjectContext);
  const { dispatch } = useContext(TasksContext);
  const cols = project?.columns || [];
  const { mutate: udpateTask } = usePatchAuthTasks();

  const handleUpadteTask = (value: string) => {
    udpateTask(
      {
        data: {
          project_id: task.project_id || '',
          sprint_id: project?.sprint_active?.id || '',
          task_id: task.id || '',
          list_id: value,
        },
      },
      {
        onSuccess: (data) => {
          dispatch({ type: 'UPDATE_TASK', payload: data.data as ResponseTaskResponse });
        },
      },
    );
  };

  const status = useMemo(() => {
    return project?.columns?.find((item) => item.id === task.list_id);
  }, [project?.columns, task.list_id]);

  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-1">
          <StatusBadge color={status?.color || ''} name={status?.name || ''} />
          <ChevronDown />
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-none py-2">
        {cols.map((item) => (
          <div
            onClick={() => handleUpadteTask(item.id || '')}
            className="py-2 px-3 group relative hover:bg-gray-1"
            key={item.id}
          >
            <StatusBadge
              className="text-xs py-0.5 px-2 rounded"
              color={item?.color || ''}
              name={item?.name || ''}
            />
            <div className="hidden absolute group-hover:block w-0.5 h-full top-0 left-0 bg-blue-4" />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default StatusCell;
