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
    <>
      <TaskTable columns={taskColumn()} data={tasks || []} />
      <TaskDetailSheet />
    </>
  );
};
export default ListTask;
