'use client';

import { Button } from '@/components/ui/button';
import { USER_AVATAR_URL } from '@/constants/common';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EmptyLaunchedWorkspace = () => {
  const { items } = useAppSelector(getSelector('listWorkspace'));
  const { user } = useAppSelector(getSelector('auth'));

  const onLaunch = (id: string) => {
    console.log(id);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="max-w-[500px] border p-4 bg-white rounded-4xl shadow-secondary w-full flex flex-col gap-8">
        <div className="flex items-end gap-2">
          <div>
            <Image
              className="animate-wave origin-[70%_70%]"
              src={'/icons/welcome.svg'}
              width={30}
              height={30}
              alt=""
            />
          </div>
          <p className="font-semibold">
            <span className="text-sm font-normal">Welcome back</span> {user?.email}
          </p>
        </div>
        <div className="flex flex-col w-full max-h-[400px] overflow-x-hidden">
          {items.map((item) => (
            <div key={item.organization.id} className="flex items-center gap-2">
              <Image
                width={40}
                height={40}
                src={item.organization.avatar || USER_AVATAR_URL}
                alt=""
              />
              <span className="text-sm font-semibold">{item.organization.name}</span>
              <Button
                className="ml-auto"
                variant={'outline'}
                onClick={() => onLaunch(item.organization.id)}
              >
                Launch
              </Button>
            </div>
          ))}
        </div>
        <Link href={'/workspace/create-workspace'}>
          <Button className="w-full" size={'xl'} variant={'active'}>
            <Plus />
            Create new Workspace
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default EmptyLaunchedWorkspace;
