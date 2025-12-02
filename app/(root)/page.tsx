'use client';

import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { mergeUrl } from '@/lib/utils';
import { redirect } from 'next/navigation';

const RootPage = () => {
  const { user } = useAppSelector(getSelector('auth'));

  const workspace = user?.meta_data.organization;

  if (workspace) {
    redirect(mergeUrl(['home', 'overview']));
  } else {
    redirect('/workspace');
  }
};

export default RootPage;
