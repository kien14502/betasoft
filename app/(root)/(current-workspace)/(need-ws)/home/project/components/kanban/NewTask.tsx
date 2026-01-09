import { useClickOutside } from '@/hooks/useClickOutside';
import { useContext, useRef, useState } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectTaskSchema,
  CreateProjectTaskSchemaType,
} from '@/constants/schemas/workspace-schema';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { ResponseTaskListResponse } from '@/app/api/generated.schemas';
import { CornerDownRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateTask } from '@/services/task-service';

type Props = {
  section: ResponseTaskListResponse;
  onBottom: () => void;
};

const NewTask = ({ section, onBottom }: Props) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const { project } = useContext(ProjectContext);
  const [isAddTask, setIsAddTask] = useState<boolean>(true);
  const { mutate: createTask, isPending: createTaskPending } = useCreateTask();

  const form = useForm<CreateProjectTaskSchemaType>({
    resolver: zodResolver(createProjectTaskSchema),
    defaultValues: {
      title: '',
      list_id: section.id || '',
      sprint_id: project?.sprint_active?.id || '',
      project_id: project?.project?.id || '',
      priority: 'medium',
    },
  });

  const toggle = () => setIsAddTask(!isAddTask);

  useClickOutside(inputRef, () => {
    setIsAddTask(false);
    form.reset();
  });

  const onSubmit = (values: CreateProjectTaskSchemaType) => {
    createTask(values, {
      onSuccess: () => {
        form.reset();
        form.setFocus('title');
        onBottom();
      },
    });
  };

  return (
    <div className="w-full my-2" ref={inputRef}>
      {isAddTask ? (
        <Form {...form}>
          <form
            className="relative h-full flex items-center bg-white p-2 rounded-2xl border shadow-secondary"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <input
              className="flex-1 outline-none p-2 text-sm"
              placeholder="Enter new task title..."
              disabled={createTaskPending}
              {...form.register('title')}
            />
            <Button
              className="text-xs"
              disabled={!form.formState.isValid || createTaskPending}
              size={'sm'}
            >
              <CornerDownRight /> Save
            </Button>
          </form>
        </Form>
      ) : (
        <button
          // style={{ backdropFilter: 'blur(5px)' }}
          onClick={() => {
            toggle();
            onBottom();
          }}
          className="text-sm w-full flex items-center font-medium gap-1.5 py-2.5 justify-center overflow-hidden px-4"
        >
          <Plus size={20} color={section.color} />
          New task
        </button>
      )}
    </div>
  );
};
export default NewTask;
