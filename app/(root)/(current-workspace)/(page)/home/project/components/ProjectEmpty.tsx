import Image from 'next/image';

const ProjectEmpty = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Image src={'/icons/prj-empty.svg'} alt="" width={200} height={124} />
  </div>
);
export default ProjectEmpty;
