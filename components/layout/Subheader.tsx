'use client';

import { homeRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Subheader = () => {
  const pathname = usePathname().split('/').filter(Boolean);

  switch (pathname[0]) {
    case 'home':
      return (
        <div className="bg-white shadow-secondary p-1 shadow-sidebar border border-[#AED2FF] flex flex-row items-center shadow-btn rounded-2xl">
          {homeRoutes.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  'rounded-xl h-[33px] text-sm flex items-center px-10',
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
    default:
      return null;
  }
};

export default Subheader;
