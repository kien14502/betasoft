import BackButton from '../BackButton';
import Link from 'next/link';
import Image from 'next/image';
import { getSelector, useAppSelector } from '@/hooks/useRedux';

const ProjectHeader = () => {
  const { info } = useAppSelector(getSelector('workspace'));

  return (
    <div className="flex items-center gap-16">
      <BackButton />
      <div className="flex flex-1 items-center justify-between pr-24">
        <p className="text-[32px] font-medium uppercase">{info?.name}</p>
        <Link
          href={'project/new'}
          className="flex items-center h-10 text-white! bg-blue-4 border-2 border-blue-2 rounded-[10px] mt-6 hover:bg-blue-5 py-2.5 px-3 text-sm font-medium! gap-2.5"
        >
          <Image src={'/icons/plus-circle.svg'} width={20} height={20} alt="" />
          New project
        </Link>
      </div>
    </div>
  );
};
export default ProjectHeader;
