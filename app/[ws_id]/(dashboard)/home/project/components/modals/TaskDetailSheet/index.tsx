import { ResponseTaskResponse } from '@/app/api/generated.schemas';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Ellipsis, PanelRightOpen, Share2, X } from 'lucide-react';
import { useState } from 'react';
import StatusCell from '../../cells/StatusCell';
import ContentLeft from './components/ContentLeft';
import ContentRight from './components/ContentRight';

type Props = {
  task: ResponseTaskResponse;
};

const TaskDetailSheet = ({ task }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => setOpen(!open);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          className="absolute hidden group-hover:flex right-2"
        >
          <PanelRightOpen size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-l-xl p-0 sm:min-w-[1094px] gap-0" isShowCloseIcon={false}>
        <SheetHeader className="border-b flex flex-row items-center justify-between border-gray-4 py-4 px-8">
          <SheetTitle className="sr-only" />
          <StatusCell task={task} />
          <div>
            <Button variant={'ghost'} size={'icon-sm'}>
              <Share2 />
            </Button>
            <Button variant={'ghost'} size={'icon-sm'}>
              <Ellipsis />
            </Button>
            <Button onClick={toggle} variant={'ghost'} size={'icon-sm'}>
              <X />
            </Button>
          </div>
        </SheetHeader>
        <div className="grid grid-cols-5 gap-8 h-full">
          <ContentLeft task={task} />
          <ContentRight task={task} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default TaskDetailSheet;
