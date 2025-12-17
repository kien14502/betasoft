'use client';

import { ProjectDetails } from '@/interface/project';
import { useGetProjectId } from '@/services/project';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { createContext } from 'react';

type ProjectContext = {
  project: ProjectDetails | undefined;
  isPending: boolean;
};

export const ProjectContext = createContext<ProjectContext>({
  project: undefined,
  isPending: false,
});

type Props = {
  children: ReactNode;
  id: string;
};

export const ProjectProvider = ({ children, id }: Props) => {
  const router = useRouter();
  const { data: project, isPending, isError } = useGetProjectId(id);

  useEffect(() => {
    if (!isError) return;
    router.replace('/home/project');
  }, [isError, router]);

  if (isError) {
    return null;
  }

  return (
    <ProjectContext.Provider value={{ project, isPending }}>{children}</ProjectContext.Provider>
  );
};
