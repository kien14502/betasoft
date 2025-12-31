'use client';

import { homeRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HomeHeader = () => {
  const pathname = usePathname().split('/').filter(Boolean);

  return (
    <div className="bg-white shadow-secondary p-1 w-fit fixed top-(--header-top) shadow-sidebar border border-[#AED2FF] flex flex-row items-center shadow-btn rounded-full">
      {homeRoutes.map((item) => (
        <Link key={item.path} href={'/home/' + item.path}>
          <div
            className={cn(
              'rounded-full h-[33px] text-sm flex items-center px-10 text-primary',
              pathname.includes(item.path) &&
                'border-2 text-white font-semibold bg-black border-gray-2',
            )}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};
export default HomeHeader;
