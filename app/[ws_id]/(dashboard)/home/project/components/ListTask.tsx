import { ResponseTaskSearchResponse } from '@/app/api/generated.schemas';
import taskColumn from './columns/taskColumn';
import { TaskTable } from './tables/TaskTable';

type Props = {
  data: ResponseTaskSearchResponse | undefined;
};

const ListTask = ({ data }: Props) => {
  const { tasks } = data!;

  return (
    <div>
      <TaskTable columns={taskColumn()} data={tasks || []} />
    </div>
  );
};
export default ListTask;
