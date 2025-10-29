import { useGetAuthTaskListsProjectId } from '@/app/api/task-list/task-list';
// import EmptyWork from '../components/EmptyWork';
import { useGetAuthProjectsProjectIdTasks } from '@/app/api/task/task';
import TaskHeader from '../components/TaskHeader';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ListTask = dynamic(() => import('../components/ListTask'), {
  ssr: true,
});
const BoardSectionList = dynamic(() => import('../components/kanban/BoardSectionList'), {
  ssr: true,
});

type Props = {
  id: string;
};

const TasksView: React.FC<Props> = ({ id }) => {
  const { data: sections, isPending: sectionsLoading } = useGetAuthTaskListsProjectId(id);
  const { data: tasks, isPending: tasksLoading } = useGetAuthProjectsProjectIdTasks(id, {
    page: 1,
    page_size: 10,
  });
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');

  const isLoading = sectionsLoading || tasksLoading;

  return (
    <div className="h-full flex-1">
      <TaskHeader viewMode={viewMode} setViewMode={setViewMode} />
      {/* <EmptyWork /> */}
      {viewMode === 'kanban' && (
        <BoardSectionList init_tasks={tasks?.data?.tasks ?? []} sections={sections?.data ?? []} />
      )}
      {viewMode === 'list' && <ListTask />}
    </div>
  );
};

export default TasksView;
