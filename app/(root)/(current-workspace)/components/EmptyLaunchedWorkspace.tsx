'use client';

import { Button } from '@/components/ui/button';
import { USER_AVATAR_URL } from '@/constants/common';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const EmptyLaunchedWorkspace = () => {
  const { items } = useAppSelector(getSelector('listWorkspace'));

  const onLaunch = (id: string) => {
    // TODO
    console.log(id);
  };

  return (
    <div className="w-full h-full flex items-center flex-col gap-6 justify-center bg-white shadow-secondary rounded-4xl">
      <Image src={'/icons/create-ws.svg'} width={178} height={164} alt="" />
      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl font-semibold">New Workspace</span>
        <span className="text-gray-4 text-center">
          Create one place to collect, manage any type of <br /> request and share your plans with
          anyone.
        </span>
      </div>
      {items.length > 0 && (
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
      )}

      <Link href={'/workspace/create-workspace'}>
        <Button className="w-full" size={'xl'} variant={'active'}>
          <Plus />
          Create new Workspace
        </Button>
      </Link>
    </div>
  );
};
export default EmptyLaunchedWorkspace;
