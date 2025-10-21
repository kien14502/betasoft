import { Skeleton } from 'antd';

const ProjectLoading = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="grid grid-cols-2 !pr-8 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton.Node
            style={{
              height: '360px',
              width: '100%',
            }}
            key={i}
            active
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 border-l border-[#8E8E93] !pl-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton.Node
            style={{
              height: '360px',
              width: '100%',
            }}
            key={i}
            active
          />
        ))}
      </div>
    </div>
  );
};
export default ProjectLoading;
