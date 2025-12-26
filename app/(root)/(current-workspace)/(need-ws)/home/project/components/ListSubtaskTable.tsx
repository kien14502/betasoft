import { useGetSubtasks } from '@/services/task-service';
import taskColumn from './columns/taskColumn';
import { TaskTable } from './tables/TaskTable';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useContext } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  task_id: string;
};

const ListSubtaskTable = ({ task_id }: Props) => {
  const { project } = useContext(ProjectContext);
  const { data, isLoading } = useGetSubtasks(project?.project.id ?? '', task_id);

  const tasks = data?.sub_tasks ?? [];

  if (isLoading)
    return (
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton className="w-full h-[52px]" key={index} />
        ))}
      </div>
    );

  return <TaskTable columns={taskColumn(true)} data={tasks || []} isSubtaskTable={true} />;
};
export default ListSubtaskTable;
