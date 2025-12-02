import Image from 'next/image';
import { ReactNode } from 'react';
import ProjectEmpty from './ProjectEmpty';
import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  children: ReactNode;
  type: 'owner' | 'member';
  isEmpty: boolean;
};

const ProjectWrapper = ({ children, type, isEmpty }: Props) => (
  <div className="py-6 max-h-full overflow-hidden rounded-4xl col-span-1 flex flex-col shadow-secondary bg-white">
    <div className="flex items-center gap-2 px-8">
      <Image
        width={40}
        height={40}
        src={type === 'owner' ? '/icons/owner-prj.svg' : '/icons/member-prj.svg'}
        alt=""
      />
      <div>
        {type === 'owner' && (
          <>
            <p className="font-semibold">You are Owner.</p>
            <span className="text-xs text-gray-7">You created the project.</span>
          </>
        )}
        {type === 'member' && (
          <>
            <p className="font-semibold">You are Member.</p>
            <span className="text-xs text-gray-7">You have been added in the project.</span>
          </>
        )}
      </div>
    </div>
    {isEmpty ? (
      <ProjectEmpty />
    ) : (
      <ScrollArea className="flex-1 min-h-0 w-full">
        <div className="grid grid-cols-2 gap-6 w-full px-8 py-6">{children}</div>
      </ScrollArea>
    )}
  </div>
);
export default ProjectWrapper;
