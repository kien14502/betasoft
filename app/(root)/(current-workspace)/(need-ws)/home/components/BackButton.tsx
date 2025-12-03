'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();
  const onClick = () => router.back();

  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className="shadow-secondary rounded-[10px] h-8 w-8"
      onClick={onClick}
    >
      <Image src={'/icons/arrow-left.svg'} width={20} height={20} alt={''} />
    </Button>
  );
};

export default BackButton;
