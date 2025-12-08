'use client';

import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { ReactNode } from 'react';
import EmptyLaunchedWorkspace from '../components/EmptyLaunchedWorkspace';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { user } = useAppSelector(getSelector('auth'));
  const isLaunchedWs = user?.meta_data?.organization;

  if (!isLaunchedWs) return <EmptyLaunchedWorkspace />;

  return <>{children}</>;
};
export default Layout;
