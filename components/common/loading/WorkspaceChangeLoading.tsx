'use client';

import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { Loader2 } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const WorkspaceChangeLoading = ({ children }: Props) => {
  const { loading } = useAppSelector(getSelector('workspace'));

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center gap-2">
        <span>Workspace changing</span>
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return children;
};
export default WorkspaceChangeLoading;
