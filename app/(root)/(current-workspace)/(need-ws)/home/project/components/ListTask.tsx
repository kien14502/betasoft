import { ResponseTaskSearchResponse } from '@/app/api/generated.schemas';
import taskColumn from './columns/taskColumn';
import { TaskTable } from './tables/TaskTable';
import TaskDetailSheet from './modals/TaskDetailSheet';

type Props = {
  data: ResponseTaskSearchResponse | undefined;
};

const ListTask = ({ data }: Props) => {
  const { tasks } = data!;

  return (
    <div className="w-full h-full min-h-0 flex-1 mt-2">
      <TaskTable columns={taskColumn()} data={tasks || []} />
      <TaskDetailSheet />
    </div>
  );
};
export default ListTask;
