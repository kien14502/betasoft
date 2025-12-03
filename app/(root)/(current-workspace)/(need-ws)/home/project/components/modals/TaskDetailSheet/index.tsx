import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Ellipsis, Share2, X } from 'lucide-react';
import { useCallback, useContext } from 'react';
import StatusCell from '../../cells/StatusCell';
import ContentLeft from './components/ContentLeft';
import ContentRight from './components/ContentRight';
import { ModalTaskTableContext } from '../../../providers/ModalTaskTableProvider';

const TaskDetailSheet = () => {
  const {
    isShowModal,
    setShowModal,
    content: task,
    setContent,
  } = useContext(ModalTaskTableContext);

  const toggle = useCallback(() => {
    setShowModal(!isShowModal);
    setContent(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowModal]);

  // if (!task) return null;

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
        <div className="grid grid-cols-5 gap-8 h-full">
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
