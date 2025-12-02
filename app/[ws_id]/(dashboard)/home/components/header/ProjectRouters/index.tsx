import { ReactNode } from 'react';
import TabItem from './TabItem';

type Props = {
  children: ReactNode;
};

const ProjectRouters = ({ children }: Props) => {
  return (
    <div className="flex flex-col flex-1 shrink-0 min-h-0">
      <div className="relative">
        <div className="absolute -top-10 right-0 shrink-0 w-full h-10 z-50">
          <div className="mx-auto h-full flex flex-col justify-end w-[calc(33.333vw+30px)]">
            <TabItem />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-4xl flex-1 min-h-0 flex flex-col px-4 shadow-secondary py-4">
        {children}
      </div>
    </div>
  );
};
export default ProjectRouters;
