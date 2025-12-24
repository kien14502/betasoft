import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useGetSubtasks, useGetTaskSections } from '@/services/task-service';
import { CircleDashed } from 'lucide-react';
import { useContext } from 'react';

type Props = {
  task_id: string;
};

const ListSubtasks = ({ task_id }: Props) => {
  // TODO
  const { project } = useContext(ProjectContext);
  const { data } = useGetSubtasks(project?.project.id ?? '', task_id);
  const { data: sections } = useGetTaskSections(project?.project.id ?? '');

  const sub_tasks = data?.sub_tasks ?? [];

  return (
    <div>
      {sub_tasks.map((task) => {
        const currentSection = sections?.find((item) => item.id === task.list_id);
        return (
          <div className="flex items-center gap-1" key={task.id}>
            <CircleDashed size={20} color={currentSection?.color} />
            {task.title}
          </div>
        );
      })}
    </div>
  );
};
export default ListSubtasks;
