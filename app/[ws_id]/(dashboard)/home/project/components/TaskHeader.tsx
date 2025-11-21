import { Button } from '@/components/ui/button';
import Image from 'next/image';
import TaskFilter from './filter/TaskFilter';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { TaskFilterSchema, taskFilterSchema } from '@/constants/schemas/workspace-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/common/form/InputField';
import { Search } from 'lucide-react';
import { TasksContext } from '@/components/providers/TasksProvider';
import { useContext, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useGetAuthProjectsProjectIdTasks } from '@/app/api/task/task';

type Props = {
  viewMode: 'kanban' | 'list';
  setViewMode: (value: 'kanban' | 'list') => void;
};

const TaskHeader: React.FC<Props> = ({ viewMode, setViewMode }) => {
  const form = useForm<TaskFilterSchema>({
    resolver: zodResolver(taskFilterSchema),
    defaultValues: { title: '' },
  });

  const { project } = useContext(ProjectContext);
  const { dispatch } = useContext(TasksContext);
  const pathname = usePathname().split('/').filter(Boolean);
  console.log(pathname[3]);

  const { data: taskData } = useGetAuthProjectsProjectIdTasks(
    pathname[3],
    {
      page: 1,
      page_size: 10,
      sprint_id: project?.sprint_active?.id,
      ...form.watch(),
    },
    { query: { select: (data) => data.data, enabled: !!project?.sprint_active?.id } },
  );

  // useEffect(() => {
  //   dispatch({
  //     type: 'INIT',
  //     payload: {
  //       page: taskData?.page || 0,
  //       page_size: taskData?.page_size || 0,
  //       total_pages: taskData?.total_pages || 0,
  //       total: taskData?.total || 0,
  //       tasks: taskData?.tasks || [],
  //     },
  //   });
  // }, [taskData]);

  return (
    <Form {...form}>
      <form className="flex items-center justify-between max-w-full">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant={viewMode !== 'list' ? 'secondary' : 'ghost'}
              size={'icon-lg'}
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-[#0045AC]' : ''}
            >
              <Image src={'/icons/check-list.svg'} width={20} height={20} alt={''} />
            </Button>
            <Button
              type="button"
              size={'icon-lg'}
              variant={viewMode !== 'kanban' ? 'secondary' : 'ghost'}
              onClick={() => setViewMode('kanban')}
              className={viewMode === 'kanban' ? 'bg-[#0045AC]' : ''}
            >
              <Image src={'/icons/chart-bar.svg'} width={20} height={20} alt={''} />
            </Button>
          </div>
          <div className="h-8 w-px bg-gray-7" />
          <InputForm
            placeholder="Search work"
            control={form.control}
            name="title"
            className="max-w-[200px] [&_input]:pl-8! [&_input]:h-9! [&_input]:rounded-md! [&_input]:shadow-secondary!"
            prefix={<Search size={16} />}
          />
        </div>
        <TaskFilter form={form} />
      </form>
    </Form>
  );
};
export default TaskHeader;
