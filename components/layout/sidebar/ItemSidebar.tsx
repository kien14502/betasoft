import { mainRoutes } from '@/constants/routes';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

type Props = {
  item: (typeof mainRoutes)[0];
  isActive: boolean;
  isCollapse: boolean;
};

const ItemSidebar = ({ item: route, isActive, isCollapse }: Props) => {
  const Icon = route.icon;
  return (
    <Link
      className={cn('text-white! text-xs', isActive && 'bg-white rounded-[64px]')}
      href={route.path}
      key={route.path}
    >
      {isCollapse ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn('p-2', isActive && 'py-6')}>
              <Icon fill={isActive ? '#0045AC' : '#D1D1D6'} />
            </div>
          </TooltipTrigger>
          <TooltipContent side="right">{route.label}</TooltipContent>
        </Tooltip>
      ) : (
        <div className={cn('flex gap-2 p-2 items-center', isActive && 'text-blue-4! font-medium')}>
          <Icon fill={isActive ? '#0045AC' : '#D1D1D6'} className="shrink-0" />
          {route.label}
        </div>
      )}
    </Link>
  );
};
export default ItemSidebar;
