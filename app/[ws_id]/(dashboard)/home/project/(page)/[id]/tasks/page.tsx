'use client';

import { useContext, useState } from 'react';
import TaskHeader from '../../../components/TaskHeader';
import EmptyWork from '../../../components/EmptyWork';
import { TasksContext } from '@/components/providers/TasksProvider';
import dynamic from 'next/dynamic';
import ModalTaskTableProvider from '../../../providers/ModalTaskTableProvider';

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
    <div className="w-full h-full min-h-0 grid grid-rows-[auto_1fr]">
      <>
        {tasks.length == 0 ? (
          <EmptyWork />
        ) : (
          <>
            <TaskHeader viewMode={viewMode} setViewMode={setViewMode} />
            {viewMode === 'kanban' && <BoardSectionList init_tasks={tasks} />}
            {viewMode === 'list' && (
              <ModalTaskTableProvider>
                <ListTask data={state} />
              </ModalTaskTableProvider>
            )}
          </>
        )}
      </>
    </div>
  );
};
export default TasksPage;
