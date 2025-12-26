import { ButtonTooltip } from '@/components/common/ButtonTooltip';
import AssigneeSelect from '@/components/common/task/AssigneeSelect';
import PrioritySelect from '@/components/common/task/PrioritySelect';
import StatusSelect from '@/components/common/task/StatusSelect';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  CreateProjectTaskSchemaType,
  createProjectTaskSchema,
} from '@/constants/schemas/workspace-schema';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { useToggle } from '@/hooks/useToggle';
import { useCreateTask, useGetTaskSections } from '@/services/task-service';
import { useGetMemberWorkspace } from '@/services/workspace-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { CornerDownRight, X } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  taskId: string;
};

const AddSubtask = ({ taskId }: Props) => {
  // TODO
  const [open, { toggle }] = useToggle();
  const { project } = useContext(ProjectContext);
  const { info } = useAppSelector(getSelector('workspace'));

  const { data: sections } = useGetTaskSections(project?.project.id ?? '');
  const { data: members } = useGetMemberWorkspace(info?.id ?? '');
  const { mutate: createTask } = useCreateTask();

  const form = useForm<CreateProjectTaskSchemaType>({
    resolver: zodResolver(createProjectTaskSchema),
    defaultValues: {
      title: '',
      list_id: '',
      sprint_id: project?.sprint_active?.id || '',
      project_id: project?.project?.id || '',
      priority: 'medium',
    },
  });

  useEffect(() => {
    form.setValue('parent_task_id', taskId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  const onSubmit = (values: CreateProjectTaskSchemaType) => {
    createTask(values, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div>
      {!open ? (
        <Button
          variant={'ghost'}
          onClick={toggle}
          className="w-fit bg-blue-1 text-blue-5 py-1.5 px-3 rounded-[8px]"
          size={'sm'}
        >
          <CornerDownRight size={20} />
          Add Sub-task
        </Button>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex items-center gap-1 p-2 rounded border shadow-secondary"
          >
            <StatusSelect
              onChange={(value) => form.setValue('list_id', value)}
              sections={sections || []}
              value={form.watch('list_id')}
            />
            <input
              {...form.register('title')}
              placeholder="Name subtask"
              className="outline-none flex-1 text-sm font-medium"
            />
            <PrioritySelect
              onChange={(value) => form.setValue('priority', value)}
              value={form.watch('priority') ?? ''}
            />
            <AssigneeSelect
              onChange={(value) => form.setValue('assignee', value)}
              users={members ?? []}
            />
            <ButtonTooltip
              content="Close"
              variant={'destructive'}
              size={'icon-xs'}
              onClick={toggle}
              type="button"
            >
              <X />
            </ButtonTooltip>
          </form>
        </Form>
      )}
    </div>
  );
};
export default AddSubtask;
