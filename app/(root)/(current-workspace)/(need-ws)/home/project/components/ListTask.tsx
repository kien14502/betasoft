import taskColumn from './columns/taskColumn';
import { TaskTable } from './tables/TaskTable';
import EmptyWork from './EmptyWork';
import { Task } from '@/interface/task';
import ListSubtaskTable from './ListSubtaskTable';

type Props = { tasks: Task[] };

const ListTask = ({ tasks }: Props) => {
  if (tasks?.length === 0) return <EmptyWork />;

  return (
    <div className="w-full h-full min-h-0 flex-1 mt-2 overflow-x-hidden">
      <TaskTable
        columns={taskColumn()}
        data={tasks || []}
        expandedContent={(row) => <ListSubtaskTable task_id={row.id} />}
      />
    </div>
  );
};
export default ListTask;
