import Controller from './Controller';
import Description from './Description';
import ProjectSelector from './ProjectSelector';

const ProjectIdHeader = () => (
  <div className="relative h-20 shrink-0">
    <div className="absolute inset-0 grid grid-cols-3">
      <div className="h-full rounded-l-3xl rounded-br-[64px] bg-white shadow-secondary"></div>
      <div className="h-1/2 bg-white shadow-secondary"></div>
      <div className="h-full rounded-r-3xl rounded-bl-[64px] bg-white shadow-secondary"></div>
    </div>
    <div className="absolute h-1/2 top-0 w-full bg-white rounded-[64px] z-10" />
    <div className="relative z-20 grid grid-cols-3 h-full">
      <div className="flex items-start flex-col justify-center pl-6">
        <ProjectSelector />
      </div>
      <div className="flex items-center justify-center h-1/2">
        <Controller />
      </div>
      <div className="flex items-center justify-center">
        <Description />
      </div>
    </div>
  </div>
);
export default ProjectIdHeader;
