import { ReactNode, Suspense } from 'react';
import { cookies } from 'next/headers';
import { getListWorkspace } from '@/services/workspace-service';
import { notFound, redirect } from 'next/navigation';
import AuthProvider from '@/components/providers/AuthProvider';

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

  // Always redirect if workspace exists
  return (
    <AuthProvider>
      <Suspense fallback={<div>...Beta Loading</div>}>{children}</Suspense>
    </AuthProvider>
  );
};
export default LayoutWorkspaceLaunched;
