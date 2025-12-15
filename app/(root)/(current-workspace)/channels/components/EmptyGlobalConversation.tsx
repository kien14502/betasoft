import Link from 'next/link';
import { GradientButton } from './gradient-button';
import Image from 'next/image';

const EmptyGlobalConversation = () => (
  <div className="flex-1 flex-col flex items-center gap-6 justify-center">
    <div
      style={{
        filter: 'drop-shadow(0px 0px 58.54px 1.46px rgba(0, 115, 255, 0.2)',
      }}
    >
      <Image
        width={130}
        height={120}
        className="object-fill"
        src={'/images/connect-friend.png'}
        alt="Connect Friend Icon"
      />
    </div>
    <div className="flex flex-col items-center">
      <p className="text-2xl font-semibold">Connect Your Friend</p>
      <span className="text-gray-4 text-center">
        Connect your friend and collaborate <br /> seamlessly in one place.
      </span>
    </div>

    <Link href={'/workspace/chat-with-friend'}>
      <GradientButton className="h-[60px] py-4 px-6 font-medium">
        <Image src={'/icons/earth-edit.svg'} width={28} height={28} alt="" />
        Global Chat
      </GradientButton>
    </Link>
  </div>
);
export default EmptyGlobalConversation;
