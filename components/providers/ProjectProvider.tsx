'use client';

import { ProjectDetails } from '@/interface/project';
import { ReactNode } from 'react';
import { createContext } from 'react';

type ProjectContext = {
  project: ProjectDetails | undefined;
};

export const ProjectContext = createContext<ProjectContext>({
  project: undefined,
});

type Props = {
  children: ReactNode;
  project: ProjectDetails;
};

export const ProjectProvider = ({ children, project }: Props) => {
  return (
    <ProjectContext.Provider
      value={{
        project,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
