'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { mergeUrl } from '@/lib/utils';
import { Loader } from 'lucide-react';

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

  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <Loader size={50} className="animate-spin" />
      Init application
    </div>
  );
};

export default RootPage;
