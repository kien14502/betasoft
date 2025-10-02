'use client';

import { EModePage } from '@/app/constants';
import { useSearchParams } from 'next/navigation';
import { use } from 'react';
import WorkSpaceView from './components/WorkSpaceView';
import NewWorkSpace from '../new/page';

const WorkSpaceEditPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');

  return mode == EModePage.EDIT ? (
    <NewWorkSpace idWorkSpace={id} />
  ) : (
    <WorkSpaceView idWorkSpace={id} />
  );
};

export default WorkSpaceEditPage;
