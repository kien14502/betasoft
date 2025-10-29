import Image from 'next/image';

const MessageTag = () => {
  return (
    <div className="w-10 h-14 rounded-b-3xl flex items-end justify-center pb-2 bg-[#002E73] absolute top-0 right-5">
      <Image src={'/icons/message.svg'} width={24} height={24} alt={''} />
    </div>
  );
};
export default MessageTag;
