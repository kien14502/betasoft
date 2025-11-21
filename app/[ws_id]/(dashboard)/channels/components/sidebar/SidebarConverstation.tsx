import { chatRoutes } from '@/constants/routes';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

const SidebarConverstation = () => {
  return (
    <div className="border-r p-2">
      <div className="flex flex-col gap-2">
        {chatRoutes.map((item) => (
          <Link href={item.path} key={item.path} className="flex items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={'icon-sm'} variant={'ghost'}>
                  <item.icon size={20} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default SidebarConverstation;
