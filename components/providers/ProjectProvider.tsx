'use client';
import { ResponseProjectWithColLabelAndSprint } from '@/app/api/generated.schemas';
import { useGetAuthProjectsProjectId } from '@/app/api/project/project';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { createContext } from 'react';

type ProjectContext = {
  project: ResponseProjectWithColLabelAndSprint | undefined;
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
  const { data: projectData, isPending, isError } = useGetAuthProjectsProjectId(id);

  useEffect(() => {
    if (!isError) return;
    router.replace('/home/project');
  }, [isError, router]);

  if (isError) {
    return null;
  }

  const project = projectData?.data;

  return (
    <ProjectContext.Provider
      value={{
        project,
        isPending,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
