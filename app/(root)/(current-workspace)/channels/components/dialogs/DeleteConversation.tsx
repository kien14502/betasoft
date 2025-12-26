import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToggle } from '@/hooks/useToggle';
import { Trash } from 'iconsax-reactjs';

const DeleteConversation = () => {
  const [openModal, { toggle }] = useToggle();

  return (
    <Dialog open={openModal} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button
          variant={'ghost'}
          className="text-red-500 text-xs font-medium justify-start hover:text-red-600"
        >
          <Trash size="24" />
          Delete this message
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-[364px]">
        <DialogHeader>
          <DialogTitle className="font-medium">Do you want delete this conversation?</DialogTitle>
          <DialogDescription />
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={toggle} size={'xl'} variant={'outline'}>
              Cancel
            </Button>
            <Button size={'xl'} variant={'destructive'}>
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteConversation;
