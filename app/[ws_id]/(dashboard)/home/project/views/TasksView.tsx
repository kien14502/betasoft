import { useGetAuthTaskListsProjectId } from '@/app/api/task-list/task-list';
import EmptyWork from '../components/EmptyWork';

type Props = {
  id: string;
};

const TasksView: React.FC<Props> = ({ id }) => {
  const { data } = useGetAuthTaskListsProjectId(id);
  console.log(data);

  return (
    <div>
      TasksView {id}
      <EmptyWork />
    </div>
  );
};

export default TasksView;
