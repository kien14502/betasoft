'use client';

import { CHAT_TYPE } from '@/constants/common';
import { WebSocketProvider } from '@/hooks/socket-provider';
import { verifyChatType } from '@/utils/common';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import HeaderChannel from './components/HeaderChannel';
import PanelProvider from './components/providers/PanelProvider';
import SidebarConversation from './components/sidebar/SidebarConversation';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const pathname = usePathname().split('/').filter(Boolean);
  const id = pathname[1];

  return (
    <WebSocketProvider>
      <PanelProvider>
        <div className="flex h-full w-full gap-6">
          <SidebarConversation id={id} />
          <HeaderChannel />
          {children}
        </div>
      </PanelProvider>
    </WebSocketProvider>
  );
};

export default Layout;
