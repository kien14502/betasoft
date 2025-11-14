import Image from 'next/image';
import { ReactNode } from 'react';
import ProjectEmpty from './ProjectEmpty';

type Props = {
  children: ReactNode;
  type: 'owner' | 'member';
  isEmpty: boolean;
};

const ProjectWrapper = ({ children, type, isEmpty }: Props) => (
  <div className="px-8 py-6 max-h-full overflow-x-hidden rounded-4xl col-span-1 flex flex-col gap-6 shadow-secondary bg-white">
    <div className="flex items-center gap-2">
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
    {isEmpty ? <ProjectEmpty /> : <>{children}</>}
  </div>
);
export default ProjectWrapper;
