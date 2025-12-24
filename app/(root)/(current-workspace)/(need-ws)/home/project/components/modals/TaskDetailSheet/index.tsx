import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Ellipsis, Share2, X } from 'lucide-react';
import StatusCell from '../../cells/StatusCell';
import ContentLeft from './components/ContentLeft';
import ContentRight from './components/ContentRight';
import { Task } from '@/interface/task';

type Props = {
  isShowModal: boolean;
  toggle: () => void;
  task: Task | null;
};

const TaskDetailSheet = ({ isShowModal, task, toggle }: Props) => {
  return (
    <Sheet open={isShowModal} onOpenChange={toggle}>
      <SheetContent className="rounded-l-xl p-0 sm:min-w-[1094px] gap-0" isShowCloseIcon={false}>
        <SheetHeader className="border-b flex flex-row items-center justify-between border-gray-4 py-4 px-8">
          <SheetTitle className="sr-only" />
          {task && <StatusCell task={task} />}
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
        <div className="grid grid-cols-5 gap-8 flex-1 min-h-0">
          {task && (
            <>
              <ContentLeft task={task} />
              <ContentRight task={task} />
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default TaskDetailSheet;
