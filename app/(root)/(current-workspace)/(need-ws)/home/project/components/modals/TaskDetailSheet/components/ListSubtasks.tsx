import StatusSelect from '@/components/common/task/StatusSelect';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useGetSubtasks, useGetTaskSections } from '@/services/task-service';
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
  if (sub_tasks.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <span className="font-semibold">Subtasks</span>
      <div className="flex flex-col gap-2">
        {sub_tasks.map((task) => {
          return (
            <div className="flex items-center gap-1" key={task.id}>
              <StatusSelect
                sections={sections || []}
                value={task.list_id}
                onChange={function (value: string): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <span className="text-sm font-semibold">{task.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ListSubtasks;
