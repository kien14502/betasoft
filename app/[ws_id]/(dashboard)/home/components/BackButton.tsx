'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const onClick = () => router.back();

  return (
    <button className="shadow-btn" onClick={onClick}>
      <Image src={'/icons/arrow-left.svg'} width={20} height={20} alt={''} />
      Back
    </button>
  );
};

export default BackButton;
