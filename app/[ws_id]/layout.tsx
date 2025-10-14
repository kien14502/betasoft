import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { getListWorkspace } from '@/services/workspace-service';
import { notFound, redirect } from 'next/navigation';

type Props = {
  children: ReactNode;
  params: Promise<{ ws_id: string }>;
};

const LayoutWorkspaceLaunched = async ({ children, params }: Props) => {
  const { ws_id } = await params;

  const cookieStore = cookies();
  const cookie = await cookieStore;
  const accessToken = cookie.get('accessToken')?.value;

  if (!accessToken) redirect('/login');
  const workspaceList = await getListWorkspace(ws_id, accessToken);

  if (!workspaceList) {
    notFound();
  }
  // return redirect(`/${ws_id}/home`);

  return <>{children}</>;
};
export default LayoutWorkspaceLaunched;
