'use client';

import { useContext, useState } from 'react';
import TaskHeader from '../../../components/TaskHeader';
import BoardSectionList from '../../../components/kanban/BoardSectionList';
import ListTask from '../../../components/ListTask';
import { useGetAuthTaskListsProjectId } from '@/app/api/task-list/task-list';
import { useGetAuthProjectsProjectIdTasks } from '@/app/api/task/task';
import { usePathname } from 'next/navigation';
import EmptyWork from '../../../components/EmptyWork';
import { ProjectContext } from '@/components/providers/ProjectProvider';

const TasksPage = () => {
  const id = usePathname().split('/')[4];
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const { project } = useContext(ProjectContext);
  const { data: sections, isPending: sectionsLoading } = useGetAuthTaskListsProjectId(id);
  const { data: tasks, isPending: tasksLoading } = useGetAuthProjectsProjectIdTasks(id, {
    page: 1,
    page_size: 10,
    sprint_id: project?.sprint_active?.id ?? '',
  });

  const isLoading = sectionsLoading || tasksLoading;

  return (
    <div className="flex flex-col gap-6">
      {!tasks ? (
        <EmptyWork />
      ) : (
        <>
          <TaskHeader viewMode={viewMode} setViewMode={setViewMode} />
          {viewMode === 'kanban' && (
            <BoardSectionList
              init_tasks={tasks?.data?.tasks ?? []}
              sections={sections?.data ?? []}
            />
          )}
          {viewMode === 'list' && <ListTask />}
        </>
      )}
    </div>
  );
};
export default TasksPage;
