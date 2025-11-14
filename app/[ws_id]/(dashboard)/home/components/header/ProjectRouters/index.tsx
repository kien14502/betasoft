import { ReactNode } from 'react';
import TabItem from './TabItem';

type Props = {
  children: ReactNode;
};

const ProjectRouters = ({ children }: Props) => {
  return (
    <div className="relative flex-1 shrink-0">
      <div className="absolute -top-10 right-0 shrink-0 w-full h-10 z-50">
        <div className="mx-auto h-full flex flex-col justify-end w-[calc(33.333vw+30px)]">
          <TabItem />
        </div>
      </div>
      <div className="overflow-hidden bg-white py-4 rounded-4xl h-full shadow-secondary px-6">
        {children}
      </div>
    </div>
  );
};
export default ProjectRouters;
