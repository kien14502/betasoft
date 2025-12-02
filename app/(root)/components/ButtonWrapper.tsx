import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  content: ReactNode;
  href: string;
};

const ButtonWrapper = ({ content, href }: Props) => {
  return (
    <Link
      href={href}
      className={cn(
        'rounded-[40px] bg-white border h-[330px] border-blue-4 flex flex-col justify-between items-center gap-6 p-8 max-w-[280px] w-full',
        'hover:border-4 hover:border-white hover:bg-[#C5DEFF] hover:shadow-blur',
        'transition-all duration-150',
      )}
    >
      {content}
    </Link>
  );
};

export default ButtonWrapper;
