'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { USER_AVATAR_URL } from '@/constants/common';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { Button } from '../ui/button';
import { launchWorkspaceUser } from '@/lib/features/auth/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGetListWorkspaceInfinite } from '@/services/workspace-service';
import { memo, useMemo } from 'react';

const WorkspaceSelector = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getSelector('auth'));
  const { data: items } = useGetListWorkspaceInfinite();

  const info = useMemo(() => user?.meta_data.organization, [user?.meta_data]);

  const onLaunch = (id: string) => {
    if (id === user?.meta_data.organization?.id) return;
    dispatch(launchWorkspaceUser(id))
      .unwrap()
      .then(() => {
        router.replace('/home/overview');
      });
  };

  if (items?.length === 0) return null;

  return (
    <Popover>
      <PopoverTrigger className="shadow-secondary gap-2 max-w-[200px] w-full shrink-0 flex items-center rounded-xl py-2 bg-white border text-sm px-3">
        <Image
          className="rounded-md object-center"
          width={24}
          height={24}
          src={info?.avatar || USER_AVATAR_URL}
          alt=""
        />
        <span className="text-ellipsis truncate overflow-hidden">
          {info?.name || 'Select workspace'}
        </span>
        <ChevronDown className="text-gray-5 ml-auto shrink-0" size={16} />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 max-h-[300px] overflow-x-auto rounded-none py-2">
        {items?.map((ws) => (
          <Button
            className="flex items-center w-full justify-start py-2 relative px-3 group cursor-pointer gap-2 text-sm"
            key={ws?.organization.id || ''}
            variant={'ghost'}
            onClick={() => onLaunch(ws?.organization.id)}
          >
            <Image
              className="rounded-md object-center"
              width={24}
              height={24}
              src={ws?.organization.avatar || USER_AVATAR_URL}
              alt=""
            />
            {ws?.organization.name}
            <div className="absolute top-0 left-0 w-0.5 h-full bg-blue-4 hidden group-hover:block" />
          </Button>
        ))}
        <Link href={'/workspace/join-workspace'}>
          <Button
            className="flex items-center w-full justify-start py-2 relative px-3 group cursor-pointer gap-2 text-sm"
            variant={'ghost'}
          >
            Join workspace
          </Button>
        </Link>
        <Link href={'/workspace/create-workspace'}>
          <Button
            className="flex items-center w-full justify-start py-2 relative px-3 group cursor-pointer gap-2 text-sm"
            variant={'ghost'}
          >
            Create workspace
          </Button>
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default memo(WorkspaceSelector);
