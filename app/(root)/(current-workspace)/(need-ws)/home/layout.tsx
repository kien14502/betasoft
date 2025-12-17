'use client';

import { ReactNode } from 'react';
import HomeHeader from './components/header/HomeHeader';
import { useAppSelector, getSelector } from '@/hooks/useRedux';
import EmptyLaunchedWorkspace from '../../components/EmptyLaunchedWorkspace';
import WorkspaceChangeLoading from '@/components/common/loading/WorkspaceChangeLoading';

const Layout = ({ children }: { children: ReactNode }) => {
  const { info } = useAppSelector(getSelector('workspace'));
  const { user } = useAppSelector(getSelector('auth'));
  const isLaunchedWs = user?.meta_data?.organization;
  return (
    <>
      <HomeHeader />
      {!info && !isLaunchedWs ? (
        <EmptyLaunchedWorkspace />
      ) : (
        <WorkspaceChangeLoading>{children}</WorkspaceChangeLoading>
      )}
    </>
  );
};

export default Layout;
