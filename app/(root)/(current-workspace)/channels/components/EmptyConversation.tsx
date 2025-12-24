import Image from 'next/image';

const EmptyConversation = () => (
  <div className="min-h-0 h-full bg-white rounded-3xl border shadow-secondary flex justify-center w-full gap-2 items-center">
    <div>
      <Image
        className="animate-wave origin-[70%_70%]"
        src={'/icons/welcome.svg'}
        width={30}
        height={30}
        alt=""
      />
    </div>
    <p className="text-lg font-medium">You are welcome</p>
  </div>
);
export default EmptyConversation;
