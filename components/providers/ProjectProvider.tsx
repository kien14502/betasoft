import { ResponseProjectWithColLabelAndSprint } from '@/app/api/generated.schemas';
import { useGetAuthProjectsProjectId } from '@/app/api/project/project';
import { ReactNode } from 'react';
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
  const { data: projectData, isPending } = useGetAuthProjectsProjectId(id);
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
