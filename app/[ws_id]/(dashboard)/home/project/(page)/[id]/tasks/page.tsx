'use client';

import { useContext, useState } from 'react';
import TaskHeader from '../../../components/TaskHeader';
import BoardSectionList from '../../../components/kanban/BoardSectionList';
import ListTask from '../../../components/ListTask';
import { useGetAuthTaskListsProjectId } from '@/app/api/task-list/task-list';
import { useGetAuthProjectsProjectIdTasks } from '@/app/api/task/task';
import { usePathname } from 'next/navigation';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import EmptyWork from '../../../components/EmptyWork';

const TasksPage = () => {
  const id = usePathname().split('/')[4];
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const { project } = useContext(ProjectContext);
  console.log('project', project);

  const { data: sections, isPending: sectionsLoading } = useGetAuthTaskListsProjectId(id);
  const { data: taskData, isPending: tasksLoading } = useGetAuthProjectsProjectIdTasks(id, {
    page: 1,
    page_size: 10,
    sprint_id: '6901e7efb4bdd3e8afec678e',
  });

  const tasks = taskData?.data?.tasks || [];
  const isLoading = sectionsLoading || tasksLoading;

  return (
    <div className="flex flex-col gap-6">
      {tasks.length == 0 ? (
        <EmptyWork />
      ) : (
        <>
          <TaskHeader viewMode={viewMode} setViewMode={setViewMode} />
          {viewMode === 'kanban' && (
            <BoardSectionList init_tasks={tasks} sections={sections?.data ?? []} />
          )}
          {viewMode === 'list' && <ListTask data={taskData?.data} />}
        </>
      )}
    </div>
  );
};
export default TasksPage;
