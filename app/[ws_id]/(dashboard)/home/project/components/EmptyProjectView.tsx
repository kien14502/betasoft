/* eslint-disable @next/next/no-img-element */
import { PlusCircleFilled } from '@ant-design/icons';

type Props = {
  onClick: () => void;
};

const EmptyProjectView: React.FC<Props> = ({ onClick }) => (
  <div className="flex-1 flex flex-col items-center justify-center">
    <img
      src={'/images/create-project.png'}
      width={560}
      height={355}
      alt={'Screenshot of the project creation screen'}
    />

    <div className="max-w-[560px] w-full flex items-center justify-center flex-col text-center gap-2">
      <p className="text-2xl font-semibold">New Project</p>
      <span className="text-[#787878]">
        Project management to ensure all relevant tasks are performed correctly, on time and to
        achieve the end goal.
      </span>
    </div>
    <button
      onClick={onClick}
      style={{ border: '2px dashed #0045AC' }}
      className="rounded-2xl bg-white !mt-6 !py-5 !px-7 flex items-center gap-2.5 font-medium text-[24px] hover:bg-[#E5F1FF]"
    >
      <PlusCircleFilled style={{ fontSize: '32px' }} />
      Create project
    </button>
  </div>
);
export default EmptyProjectView;
