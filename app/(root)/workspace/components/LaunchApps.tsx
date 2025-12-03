'use client';

import { useGetAuthOrganizations } from '@/app/api/organizations/organizations';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import { launchWorkspace } from '@/services/workspace-service';

const LaunchApp = () => {
  const { user } = useAppSelector(getSelector('auth'));
  const { data } = useGetAuthOrganizations({
    page: 1,
    page_size: 10,
  });

  const workspaces = data?.data;

  const onLaunchWorkspace = (id: string) => {
    launchWorkspace(id);
  };

  return (
    <div className="w-full flex items-start flex-col bg-white p-2 rounded-lg gap-4">
      <span>Workspace for {user?.full_name}</span>
      <ScrollArea className="w-full h-[200px]">
        <div className="flex flex-col gap-2">
          {workspaces?.organizations?.map((item, i) => (
            <div key={i} className="w-full flex items-center gap-2 justify-between">
              {item.organization?.name}
              <Button onClick={() => onLaunchWorkspace(item.organization?.id || '')}>Launch</Button>
              {/* <Link href={item.organization?.id + '/home/overview' || ''}>
                <Button>Launch</Button>
              </Link> */}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
export default LaunchApp;
