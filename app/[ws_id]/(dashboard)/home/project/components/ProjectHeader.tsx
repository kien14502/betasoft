import { ProjectContext } from '@/components/providers/ProjectProvider';
import dynamic from 'next/dynamic';
import { ReactNode, useContext } from 'react';
import TabsBar from './TabsBar';
import { MembersProjectContext } from '@/components/providers/MembersProjectProvider';
import { Ellipsis } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProjectAction = dynamic(() => import('./ProjectAction'), {
  loading: () => <div>loading...</div>,
});

type Props = { children: ReactNode };

const ProjectHeader: React.FC<Props> = ({ children }) => {
  const { isPending, project: data } = useContext(ProjectContext);
  const { members } = useContext(MembersProjectContext);
  const project = data?.project;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center gap-1">
        <span className="text-[#787878]">PROJECTS </span>
        {isPending ? (
          <>
            <Skeleton style={{ height: '16px' }} />
          </>
        ) : (
          <span className="font-semibold uppercase"> / {project?.name}</span>
        )}
      </div>
      <div className="bg-white flex flex-col gap-4 flex-1 w-full rounded-2xl shadow-main !py-4 !px-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col items-start">
            {isPending ? (
              <>
                <Skeleton style={{ height: '16px' }} />
                <Skeleton style={{ height: '14px', width: '100%' }} />
              </>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <h1 className="text-2xl text-[#002E73] font-semibold">{project?.name}</h1>
                  {/* <Popover placement="bottomLeft" content={<ProjectAction />} trigger="click">
                    <button type="button">
                      <Ellipsis />
                    </button>
                  </Popover> */}
                </div>
                <span className="text-sm text-[#787878]">{project?.description}</span>
              </>
            )}
          </div>
          <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
            {members.map((mem) => (
              <Avatar key={mem.member?.id}>
                <AvatarImage src={mem.member?.profile_image} alt="@shadcn" />
                <AvatarFallback>{mem.member?.full_name}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
        <TabsBar />
        {children}
      </div>
    </div>
  );
};

export default ProjectHeader;
