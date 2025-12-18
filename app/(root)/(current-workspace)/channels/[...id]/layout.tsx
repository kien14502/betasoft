import { ReactNode } from 'react';
import { WebSocketProvider } from '@/hooks/socket-provider';
import SidebarConversation from '../components/sidebar/SidebarConverstation';
import HeaderChannel from '../components/HeaderChannel';
import EmptyConversation from '../components/EmptyConversation';
import { CHAT_TYPE } from '@/constants/common';
import { redirect } from 'next/navigation';
import { verifyChatType } from '@/utils/common';

type Props = {
  params: Promise<{ id: string[] }>;
  children: ReactNode;
};

const Layout = async ({ children, params }: Props) => {
  const { id } = await params;
  const type = id[0];
  const roomId = id[1];

  const fType = verifyChatType(type);

  if (!fType) {
    redirect(`/channels/${CHAT_TYPE.GLOBAL}`);
  }

  return (
    <WebSocketProvider>
      <div className="flex h-full w-full gap-6">
        <SidebarConversation type={fType} id={roomId} />
        <HeaderChannel key_chat={fType} />
        {roomId ? (
          <div className="bg-white rounded-4xl shadow-secondary flex-1 min-h-0 flex">
            {children}
          </div>
        ) : (
          <EmptyConversation />
        )}
      </div>
    </WebSocketProvider>
  );
};

export default Layout;
