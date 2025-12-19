import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useGetSubtasks } from '@/services/task-service';
import { useContext } from 'react';

type Props = {
  task_id: string;
};

const ListSubtasks = ({ task_id }: Props) => {
  // TODO
  const { project } = useContext(ProjectContext);
  const { data } = useGetSubtasks(project?.project.id ?? '', task_id);
  console.log('subtasks', data);

  return <div></div>;
};
export default ListSubtasks;
