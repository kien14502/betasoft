'use client';

import { use, useContext, useEffect, useState } from 'react';
import TaskHeader from '../../../components/TaskHeader';
import dynamic from 'next/dynamic';
import ModalTaskTableProvider from '../../../providers/ModalTaskTableProvider';
import { useGetTask } from '@/services/task-service';
import { ProjectContext } from '@/components/providers/ProjectProvider';
import { TaskFilterSchema } from '@/constants/schemas/workspace-schema';

const ListTask = dynamic(() => import('../../../components/ListTask'), {
  loading: () => <div>Loading...</div>,
});

const BoardSectionList = dynamic(() => import('../../../components/kanban/BoardSectionList'), {
  loading: () => <div>Loading...</div>,
});

type Props = {
  params: Promise<{ id: string }>;
};

const TasksPage = ({ params }: Props) => {
  const { id } = use(params);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const [filter, setFilter] = useState<TaskFilterSchema>({});
  const { project } = useContext(ProjectContext);

  const { data, refetch } = useGetTask(id, project?.sprint_active?.id, filter);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  return (
    <div className="w-full min-h-0 grid grid-rows-[auto_1fr] flex-1">
      <>
        <TaskHeader viewMode={viewMode} setViewMode={setViewMode} setFilter={setFilter} />
        <ModalTaskTableProvider>
          <>
            {viewMode === 'kanban' && <BoardSectionList id={id} tasks={data?.tasks ?? []} />}
            {viewMode === 'list' && <ListTask tasks={data?.tasks ?? []} />}
          </>
        </ModalTaskTableProvider>
      </>
    </div>
  );
};
export default TasksPage;
