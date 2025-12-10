import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToggle } from '@/hooks/useToggle';
import Image from 'next/image';

const TaskAction = () => {
  const [open, { toggle }] = useToggle();

  return (
    <Popover open={open} onOpenChange={toggle}>
      <PopoverTrigger data-dnd-kit-disabled-draggable="true" asChild>
        <Button
          data-dnd-kit-disabled-draggable="true"
          type="button"
          variant={'ghost'}
          size={'icon-sm'}
        >
          <Image width={20} height={20} src={'/icons/dots.svg'} alt={''} />
        </Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
export default TaskAction;
