import taskColumn from './columns/taskColumn';
import { TaskTable } from './tables/TaskTable';
import TaskDetailSheet from './modals/TaskDetailSheet';
import { useGetTask } from '@/services/task-service';
import { usePathname } from 'next/navigation';
import EmptyWork from './EmptyWork';

const ListTask = () => {
  const id = usePathname().split('/')[3];
  const { data: tasks } = useGetTask(id);

  if (tasks?.total === 0) return <EmptyWork />;

  return (
    <div className="w-full h-full min-h-0 flex-1 mt-2 overflow-x-hidden">
      <TaskTable columns={taskColumn()} data={tasks?.tasks || []} />
      <TaskDetailSheet />
    </div>
  );
};
export default ListTask;
