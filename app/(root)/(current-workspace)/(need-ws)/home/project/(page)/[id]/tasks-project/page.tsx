'use client';

import { useState } from 'react';
import TaskHeader from '../../../components/TaskHeader';
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

  return (
    <div className="w-full min-h-0 grid grid-rows-[auto_1fr] flex-1">
      <>
        <TaskHeader viewMode={viewMode} setViewMode={setViewMode} />
        {viewMode === 'kanban' && <BoardSectionList />}
        {viewMode === 'list' && (
          <ModalTaskTableProvider>
            <ListTask />
          </ModalTaskTableProvider>
        )}
      </>
    </div>
  );
};
export default TasksPage;
