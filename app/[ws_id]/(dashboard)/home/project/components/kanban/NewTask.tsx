import { useClickOutside } from '@/hooks/useClickOutside';
import { useContext, useRef, useState } from 'react';
import Image from 'next/image';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import TextareaForm from '@/components/common/form/TextareaForm';
import { usePostAuthTasks } from '@/app/api/task/task';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createProjectTaskSchema,
  CreateProjectTaskSchemaType,
} from '@/constants/schemas/workspace-schema';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { ResponseTaskListResponse, ResponseTaskResponse } from '@/app/api/generated.schemas';
import { TasksContext } from '@/components/providers/TasksProvider';

type Props = {
  section: ResponseTaskListResponse;
};

const NewTask = ({ section }: Props) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const { project } = useContext(ProjectContext);
  const { dispatch } = useContext(TasksContext);
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
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
  const { mutate: createTask, isPending: createTaskPending } = usePostAuthTasks();

  const toggle = () => setIsAddTask(!isAddTask);

  useClickOutside(inputRef, () => {
    setIsAddTask(false);
    form.reset();
  });

  const onSubmit = (values: CreateProjectTaskSchemaType) => {
    createTask(
      { data: values },
      {
        onSuccess({ data }) {
          form.reset();
          dispatch({ type: 'ADD_TASK', payload: data as ResponseTaskResponse });
        },
      },
    );
  };

  const handleOnKeyEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <div className="w-full" ref={inputRef}>
      {isAddTask ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TextareaForm
              className="bg-white shadow-popup h-[100px]"
              onKeyDown={handleOnKeyEnter}
              control={form.control}
              name={'title'}
              rows={4}
              placeholder="Enter task title..."
              disabled={createTaskPending}
            />
          </form>
        </Form>
      ) : (
        <button
          onClick={toggle}
          className="text-sm opacity-0 w-full hover:opacity-100 hover:bg-gray-5 rounded flex items-center font-medium gap-1.5 !py-2.5 !px-4"
        >
          <Image src={'/icons/plus.svg'} alt={''} width={20} height={20} />
          New task
        </button>
      )}
    </div>
  );
};
export default NewTask;
