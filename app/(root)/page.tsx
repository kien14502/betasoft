'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { mergeUrl } from '@/lib/utils';

const RootPage = () => {
  const router = useRouter();
  const { user } = useAppSelector(getSelector('auth'));

  const workspace = user?.meta_data?.organization;

  useEffect(() => {
    if (workspace) {
      router.replace(mergeUrl(['home', 'overview']));
    } else {
      router.replace('/workspace');
    }
  }, [router, workspace]);

  return null;
};

export default RootPage;
