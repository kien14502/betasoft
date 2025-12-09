'use client';

import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { ReactNode } from 'react';
import EmptyLaunchedWorkspace from '../components/EmptyLaunchedWorkspace';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { info } = useAppSelector(getSelector('workspace'));
  const { user } = useAppSelector(getSelector('auth'));
  const isLaunchedWs = user?.meta_data?.organization;

  if (!info && !isLaunchedWs) return <EmptyLaunchedWorkspace />;

  return <>{children}</>;
};
export default Layout;
