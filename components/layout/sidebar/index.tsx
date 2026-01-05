'use client';

import { SettingIcon } from '@/components/icons';
import { mainRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import InviteMemberModal from '../InviteMemberModal';
import CreateTaskModal from '@/app/(root)/components/CreateTaskModal';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import ItemSidebar from './ItemSidebar';
import UserPanel from './UserPanel';
import { usePersistentState } from '@/hooks/usePersistentState';

const Sidebar = () => {
  const [isCollapse, toggle] = usePersistentState('SIDEBAR-COLLAPSE-STORAGE', false);
  const pathname = usePathname().split('/').filter(Boolean);
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          'flex flex-col text-white shrink-0 shadow-secondary rounded-r-[36px] w-14 z-50 bg-text-primary top-0',
          'transition-[width] duration-500 py-4 px-2.5',
          isCollapse ? 'w-14' : 'w-28',
        )}
      >
        <div className="flex flex-col gap-8 flex-1">
          {mainRoutes.map((route) => {
            const isActive = pathname.includes(route.path.split('/')[1]);
            return (
              <ItemSidebar
                key={route.path}
                isActive={isActive}
                isCollapse={isCollapse}
                item={route}
              />
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
          <div className="gap-2 flex items-center justify-between">
            <UserPanel />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <SettingIcon fill="#D1D1D6" />
            {!isCollapse && 'Setting'}
          </div>
          <Button
            className={cn('duration-500', isCollapse && 'rotate-180')}
            size={'icon-xs'}
            onClick={() => toggle(!isCollapse)}
            variant={'ghost'}
          >
            <ChevronLeft />
          </Button>
        </div>
      </div>
      <CreateTaskModal openModal={createTaskModal} setOpenModal={setCreateTaskModal} />
    </>
  );
};
export default Sidebar;
