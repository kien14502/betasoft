import { ReactNode } from 'react';
import SidebarConverstation from './components/sidebar/SidebarConverstation';
import HeaderChannel from './components/HeaderChannel';
import { WebSocketProvider } from '@/hooks/socket-provider';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <WebSocketProvider>
      <div className="flex h-full w-full gap-6">
        <SidebarConverstation />
        <HeaderChannel />
        <div className="bg-white rounded-4xl shadow-secondary flex-1 min-h-0 flex">{children}</div>
      </div>
    </WebSocketProvider>
  );
};

export default Layout;
