'use client';

import { useContext, useState } from 'react';
import TaskHeader from '../../../components/TaskHeader';
import EmptyWork from '../../../components/EmptyWork';
import { TasksContext } from '@/components/providers/TasksProvider';
import dynamic from 'next/dynamic';

const ListTask = dynamic(() => import('../../../components/ListTask'), {
  loading: () => <div>Loading...</div>,
});

const BoardSectionList = dynamic(() => import('../../../components/kanban/BoardSectionList'), {
  loading: () => <div>Loading...</div>,
});

const TasksPage = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('list');
  const { state } = useContext(TasksContext);

  const tasks = state.tasks;

  return (
    <div className="flex flex-col gap-6">
      {tasks.length == 0 ? (
        <EmptyWork />
      ) : (
        <>
          <TaskHeader viewMode={viewMode} setViewMode={setViewMode} />
          {viewMode === 'kanban' && <BoardSectionList init_tasks={tasks} />}
          {viewMode === 'list' && <ListTask data={state} />}
        </>
      )}
    </div>
  );
};
export default TasksPage;
