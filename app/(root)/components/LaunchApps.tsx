'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { launchWorkspaceUser } from '@/lib/features/auth/actions';
import { useGetListWorkspaceInfinite } from '@/services/workspace-service';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LaunchApp = () => {
  const { user } = useAppSelector(getSelector('auth'));

  const {
    data: workspaces,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useGetListWorkspaceInfinite();

  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLaunchWorkspace = (id: string) => {
    dispatch(launchWorkspaceUser(id))
      .unwrap()
      .then(() => {
        router.replace('/home/overview');
      });
  };

  if (!workspaces && isFetching) return null;
  if (workspaces && workspaces?.length === 0) return null;

  return (
    <div className="w-full flex items-start flex-col bg-white p-2 rounded-lg gap-4">
      <span>Workspace for {user?.full_name}</span>
      <ScrollArea className="w-full ">
        <div className="flex flex-col gap-2 max-h-[200px]">
          {workspaces?.map((item, i) => {
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
          <div ref={targetRef} />
        </div>
      </ScrollArea>
    </div>
  );
};
export default LaunchApp;
