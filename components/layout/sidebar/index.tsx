'use client';

import { SettingIcon } from '@/components/icons';
import { USER_AVATAR_URL } from '@/constants/common';
import { mainRoutes } from '@/constants/routes';
import { useAppSelector, getSelector } from '@/hooks/useRedux';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import InviteMemberModal from '../InviteMemberModal';
import CreateTaskModal from '@/app/(root)/components/CreateTaskModal';

const Sidebar = () => {
  const { user: profile } = useAppSelector(getSelector('auth'));
  const [isCollapse, setIsCollapse] = useState<boolean>(true);
  const pathname = usePathname().split('/').filter(Boolean);
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);

  return (
    <>
      <div
        onMouseEnter={() => setIsCollapse(false)}
        onMouseLeave={() => setIsCollapse(true)}
        className={cn(
          'fixed flex flex-col left-0 text-white shrink-0 shadow-secondary rounded-r-[36px] w-14 z-50 bg-text-primary h-screen top-0',
          'transition-[width] duration-300 py-4 px-2.5',
          isCollapse ? 'w-14' : 'w-28',
        )}
      >
        <div className="flex flex-col gap-8 flex-1">
          {mainRoutes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname.includes(route.path.split('/')[1]);

            return (
              <Link
                className={cn('text-white! text-xs', isActive && 'bg-white rounded-[64px]')}
                href={route.path}
                key={route.path}
              >
                {isCollapse ? (
                  <div className={cn('p-2', isActive && 'py-6')}>
                    <Icon fill={isActive ? '#0045AC' : '#D1D1D6'} />
                  </div>
                ) : (
                  <div
                    className={cn(
                      'flex gap-2 p-2 items-center',
                      isActive && 'text-blue-4! font-medium',
                    )}
                  >
                    <Icon fill={isActive ? '#0045AC' : '#D1D1D6'} className="shrink-0" />
                    {route.label}
                  </div>
                )}
              </Link>
            );
          })}
          <button
            onClick={() => setCreateTaskModal(true)}
            style={{ background: 'linear-gradient(360deg, #FFAE00 16.82%, #FFD900 90.38%' }}
            className={cn(
              'border-2 border-yellow-3 rounded-[64px]',
              isCollapse ? 'py-12 px-1.5' : 'py-1.5 px-8',
            )}
          >
            <Image src={'/icons/plus.svg'} width={24} height={24} alt="" />
          </button>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center">
          <InviteMemberModal isCollapse={isCollapse} />
          <Image
            width={40}
            height={40}
            className="rounded-full object-center"
            src={profile?.profile_image || USER_AVATAR_URL}
            alt=""
          />
          <div className="flex items-center gap-2 text-xs">
            <SettingIcon fill="#D1D1D6" />
            {!isCollapse && 'Setting'}
          </div>
        </div>
      </div>
      <CreateTaskModal openModal={createTaskModal} setOpenModal={setCreateTaskModal} />
    </>
  );
};
export default Sidebar;
