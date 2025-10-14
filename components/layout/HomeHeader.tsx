import { homeRoutes } from '@/constants/routes';
import { cn } from '@/utils/common';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HomeHeader = () => {
  const pathname = usePathname();
  const router = pathname.split('/').slice(0, 3).join('/');

  return (
    <div className="bg-white flex h-fit flex-row shadow-btn rounded-[64px] !p-1">
      {homeRoutes.map((item) => (
        <Link key={item.path} href={router + item.path}>
          <div
            className={cn(
              '!py-3 !px-10 font-semibold rounded-[64px]',
              pathname.split('/').includes(item.path.split('/')[1]) && 'bg-[#0045AC] text-white',
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
