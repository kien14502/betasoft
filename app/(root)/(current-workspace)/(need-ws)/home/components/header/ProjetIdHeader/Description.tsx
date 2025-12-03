'use client';

import { ProjectContext } from '@/components/providers/ProjectProvider';
import { useContext } from 'react';

const Description = () => {
  const { project } = useContext(ProjectContext);
  return (
    <div className="flex flex-col items-start justify-start h-full py-4 px-6 w-full max-w-[500px]">
      <p className="font-semibold text-sm">&#9679; Description</p>
      <div className="text-sm overflow-hidden line-clamp-2 pl-2">
        {project?.project?.description}
      </div>
    </div>
  );
};
export default Description;
