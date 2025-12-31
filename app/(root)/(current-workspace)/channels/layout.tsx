'use client';

import { CHAT_TYPE } from '@/constants/common';
import { WebSocketProvider } from '@/hooks/socket-provider';
import { verifyChatType } from '@/utils/common';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import HeaderChannel from './components/HeaderChannel';
import PanelProvider from './components/providers/PanelProvider';
import SidebarConversation from './components/sidebar/SidebarConverstation';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname().split('/').filter(Boolean);
  const type = pathname[1];
  const id = pathname[2];

  const fType = verifyChatType(type);

  if (!fType) {
    redirect(`/channels/${CHAT_TYPE.GLOBAL}`);
  }

  return (
    <WebSocketProvider>
      <PanelProvider>
        <div className="flex h-full w-full gap-6">
          <SidebarConversation type={fType} id={id} />
          <HeaderChannel key_chat={fType} />
          {children}
        </div>
      </PanelProvider>
    </WebSocketProvider>
  );
};

export default Layout;
