import Image from 'next/image';

const LoadingPage = () => {
  return (
    <div className="w-full h-full bg-white shadow-secondary rounded-4xl flex items-center justify-center">
      <Image width={40} height={40} src={'/logo.svg'} alt="" />
    </div>
  );
};
export default LoadingPage;
