import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getListWorkspace } from '@/services/workspace-service';
import { notFound, redirect } from 'next/navigation';
import AuthProvider from '@/components/providers/AuthProvider';
import { GLOBAL } from '@/constants/routes';
import MainHeader from '@/components/layout/MainHeader';
import Sidebar from '@/components/layout/sidebar';

type Props = {
  children: ReactNode;
  params: Promise<{ ws_id: string }>;
};

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      <div className="w-screen h-screen bg-secondary overflow-hidden">
        <Sidebar />
        <div className="w-screen h-screen flex flex-col pl-14 bg-secondary overflow-hidden">
          <MainHeader />
          <div className="flex flex-col min-h-0 h-[calc(100vh-64px)]">
            {/* {children} */}
            <div className="overflow-hidden min-h-0 h-full flex flex-col p-4 pt-2 gap-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};

const LayoutWorkspaceLaunched = async ({ children, params }: Props) => {
  const { ws_id } = await params;
  console.log('ws_id', ws_id);

  if (ws_id === GLOBAL) {
    return <LayoutWrapper>choice workspace</LayoutWrapper>;
  }
  // const cookieStore = cookies();
  // const cookie = await cookieStore;
  // const accessToken = cookie.get('accessToken')?.value;

  // if (!accessToken) redirect('/login');

  // const workspaceList = await getListWorkspace(ws_id, accessToken);

  // if (!workspaceList) {
  //   notFound();
  // }

  return (
    <AuthProvider>
      <div className="w-screen h-screen bg-secondary overflow-hidden">
        <Sidebar />
        <div className="w-screen h-screen flex flex-col pl-14 bg-secondary overflow-hidden">
          <MainHeader />
          <div className="flex flex-col min-h-0 h-[calc(100vh-64px)]">
            {/* {children} */}
            <div className="overflow-hidden min-h-0 h-full flex flex-col p-4 pt-2 gap-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
};
export default LayoutWorkspaceLaunched;
