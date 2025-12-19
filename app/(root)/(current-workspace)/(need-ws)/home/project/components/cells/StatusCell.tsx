import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, Loader } from 'lucide-react';
import { useContext } from 'react';
import StatusBadge from '../StatusBadge';
import { useMemo } from 'react';
import { Task } from '@/interface/task';
import { useUpdateTask } from '@/services/task-service';
import { useToggle } from '@/hooks/useToggle';

type Props = {
  task: Task;
};

const StatusCell = ({ task }: Props) => {
  const { project } = useContext(ProjectContext);
  const cols = project?.columns || [];
  const { mutate: updateTask, isPending } = useUpdateTask(project?.sprint_active.id ?? '');
  const [openModal, { toggle }] = useToggle();

  const handleUpdateTask = (value: string) => {
    updateTask(
      {
        project_id: task.project_id || '',
        sprint_id: project?.sprint_active?.id || '',
        list_id: value,
        task_id: task.id,
      },
      {
        onSuccess: () => {
          toggle();
        },
      },
    );
  };

  const status = useMemo(() => {
    return project?.columns?.find((item) => item.id === task.list_id);
  }, [project?.columns, task.list_id]);

  return (
    <Popover open={openModal} onOpenChange={toggle}>
      <PopoverTrigger>
        <div className="flex items-center gap-1">
          <StatusBadge color={status?.color || ''} name={status?.name || ''} />
          {isPending ? <Loader size={20} className="animate-spin" /> : <ChevronDown size={20} />}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-none py-2">
        {cols.map((item) => (
          <div
            onClick={() => handleUpdateTask(item.id || '')}
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
