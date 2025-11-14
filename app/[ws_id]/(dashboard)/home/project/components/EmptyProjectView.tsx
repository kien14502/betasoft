import Image from 'next/image';
import Link from 'next/link';

const EmptyProjectView = () => (
  <div className="w-full h-full flex flex-col items-center justify-center">
    <div className="shadow-secondary rounded-5xl bg-white py-8 w-full max-w-[640px] flex flex-col items-center">
      <Image
        src={'/icons/ws-empty.svg'}
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
      <Link
        href={'project/new'}
        className="flex items-center h-[72px] text-white! bg-blue-4 border-2 border-blue-2 rounded-[18px] mt-6 hover:bg-blue-5 py-5 px-7 text-2xl font-medium! gap-2.5"
      >
        <Image src={'/icons/plus-circle.svg'} width={32} height={32} alt="" />
        Create project
      </Link>
    </div>
  </div>
);
export default EmptyProjectView;
