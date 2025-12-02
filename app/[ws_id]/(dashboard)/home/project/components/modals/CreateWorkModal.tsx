import { usePostAuthTasks } from '@/app/api/task/task';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useContext } from 'react';
import UrgencySelector from '../UrgencySelector';
import { showToast } from '@/utils/toast';
import { MembersProjectContext } from '@/components/providers/MembersProjectProvider';
import { CreateProjectTaskSchemaType } from '@/constants/schemas/workspace-schema';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import InputForm from '@/components/common/form/InputField';
import TextareaForm from '@/components/common/form/TextareaForm';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';
import SingleSelect from '@/components/common/SingleSelect';
import { Calendar, UserRound } from 'lucide-react';
import { DatePicker } from '@/components/common/DatePicker';
import { fDate } from '@/utils/dayjs';
import { TasksContext } from '@/components/providers/TasksProvider';
import { ResponseTaskResponse } from '@/app/api/generated.schemas';

type Props = {
  toggle: () => void;
};

const CreateWorkModal: React.FC<Props> = ({ toggle }) => {
  const { project } = useContext(ProjectContext);
  const { dispatch } = useContext(TasksContext);
  const form = useForm<CreateProjectTaskSchemaType>({
    defaultValues: {
      title: '',
      priority: 'medium',
      sprint_id: project?.sprint_active?.id,
      project_id: project?.project?.id,
    },
  });

  useEffect(() => {
    if (!project) return;
    form.setValue('sprint_id', project.sprint_active?.id ?? '');
    form.setValue('project_id', project.project?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  const { mutate: createTask } = usePostAuthTasks();
  const { members } = useContext(MembersProjectContext);

  const onFinish = (values: CreateProjectTaskSchemaType) => {
    createTask(
      { data: values },
      {
        onSuccess({ message, data }) {
          if (data) {
            console.log('data', data);

            dispatch({ type: 'ADD_TASK', payload: data as ResponseTaskResponse });
            toggle();
            showToast(message ?? '', 'success');
          }
        },
      },
    );
  };

  const memberOptions = useMemo(() => {
    return members.map((item) => {
      const mem = item.member;
      return {
        label: mem?.full_name ?? '',
        value: mem?.id ?? '',
        avatar: mem?.profile_image || '/icons/user-circle.svg',
      };
    });
  }, [members]);

  const listOptions = useMemo(() => {
    const options = project?.columns?.map((item) => ({
      label: item.name ?? '',
      color: item.color ?? '',
      value: item.id ?? '',
    }));
    return options ?? [];
  }, [project?.columns]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="py-5 px-8 flex flex-col gap-8">
        <InputForm control={form.control} name={'title'} label="Title" />
        <TextareaForm control={form.control} name={'description'} label="Description" />
        <div className="w-full grid grid-cols-2 gap-8">
          <SingleSelect
            options={memberOptions}
            onChange={({ value }) => form.setValue('assignee', value)}
            renderItem={(item) => (
              <div className="flex items-center gap-2 justify-center">
                <Image
                  width={24}
                  height={24}
                  className="object-center"
                  src={item.avatar}
                  alt={item.label}
                />
                <span className="text-xs">{item.label}</span>
              </div>
            )}
            trigger={'Assignee'}
            label={'Assignee'}
            value={form.watch('assignee', '') ?? ''}
            prefix={<UserRound size={24} />}
            classNames={{ trigger: 'h-12' }}
          />
          <SingleSelect
            classNames={{ trigger: 'h-12' }}
            options={listOptions}
            onChange={({ value }) => form.setValue('list_id', value)}
            renderItem={(item) => (
              <div
                className="w-fit py-0.5 px-2 rounded text-xs font-medium text-white"
                style={{ backgroundColor: item.color }}
              >
                {item.label}
              </div>
            )}
            trigger={'Status'}
            label={'Status'}
            value={form.watch('list_id', '') ?? ''}
          />
        </div>
        <DatePicker
          prefix={<Calendar size={20} />}
          label="Due date"
          value={fDate(form.watch('due_date'))}
          onChange={(value) => form.setValue('due_date', value?.toDateString())}
        />
        <UrgencySelector
          value={form.watch('priority')}
          onChange={(value) => form.setValue('priority', value)}
        />
        <div className="border-t border-gray-4 flex items-center justify-end gap-4 !py-6 !px-8">
          <Button onClick={toggle} type="button" variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Create task</Button>
        </div>
      </form>
    </Form>
  );
};
export default CreateWorkModal;
