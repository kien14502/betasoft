'use client';
import { projectRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import TabActive from './TabActive';
import Image from 'next/image';
import { motion } from 'framer-motion';

const TabItem = () => {
  const pathname = usePathname().split('/').filter(Boolean);

  return (
    <div
      style={{
        boxShadow: '0px 2px 2px 0px hsba(205, 100%, 43%, 0.1) inset',
      }}
      className="flex items-end h-9 w-full justify-between"
    >
      <Image height={36} width={58.44} src={'/icons/wave-left.svg'} alt={''} />
      <div className="w-full bg-blue-1 flex items-center justify-between h-9">
        {projectRoutes.map((route) => {
          const isActive = pathname.includes(route.path);
          return (
            <Link
              href={route.path}
              className={cn('flex h-9 items-center text-sm text-blue-5! relative')}
              key={route.path}
            >
              {route.name}
              {isActive && (
                <>
                  <TabActive key={route.path} name={route.name} icon={route.icon} />
                  <motion.div
                    layoutId="div"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: 'easeOut',
                    }}
                    className={cn(
                      'h-0.5 absolute w-8',
                      'bottom-0 left-1/2  translate-x-[-50%] z-10 bg-blue-5 rounded-xl',
                    )}
                  />
                </>
              )}
            </Link>
          );
        })}
      </div>
      <Image height={36} width={58.44} src={'/icons/wave-right.svg'} alt={''} />
    </div>
  );
};

export default TabItem;
