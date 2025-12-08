'use client';

import { useGetAuthOrganizations } from '@/app/api/organizations/organizations';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { launchWorkspaceUser } from '@/lib/features/auth/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LaunchApp = () => {
  const { user } = useAppSelector(getSelector('auth'));
  const { data } = useGetAuthOrganizations({
    page: 1,
    page_size: 10,
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const workspaces = data?.data;

  const onLaunchWorkspace = (id: string) => {
    dispatch(launchWorkspaceUser(id))
      .unwrap()
      .then(() => {
        router.replace('/home/overview');
      });
  };

  return (
    <div className="w-full flex items-start flex-col bg-white p-2 rounded-lg gap-4">
      <span>Workspace for {user?.full_name}</span>
      <ScrollArea className="w-full h-[200px]">
        <div className="flex flex-col gap-2">
          {workspaces?.organizations?.map((item, i) => {
            const isLaunched = user?.meta_data.organization?.id === item.organization?.id;
            return (
              <div key={i} className="w-full flex items-center gap-2 justify-between">
                {item.organization?.name}
                {isLaunched ? (
                  <Link href={'/home/overview'}>
                    <Button onClick={() => onLaunchWorkspace(item.organization?.id || '')}>
                      Go to workspace
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant={'active'}
                    onClick={() => onLaunchWorkspace(item.organization?.id || '')}
                  >
                    Launch
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
export default LaunchApp;
