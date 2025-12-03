import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ellipsis, PencilLine, Share2, Trash2 } from 'lucide-react';

const TaskCellAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={'icon'} variant={'ghost'}>
          <Ellipsis className="rotate-90" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 rounded-none sm:min-w-[160px] py-2">
        <DropdownMenuItem className="h-11 rounded-none relative group">
          <Share2 /> Share
          <div className="absolute h-full hidden group-hover:block bg-blue-4 top-0 left-0 w-0.5"></div>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-11 rounded-none relative group">
          <PencilLine />
          Edit
          <div className="absolute h-full hidden group-hover:block bg-blue-4 top-0 left-0 w-0.5"></div>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-11 rounded-none relative group">
          <Trash2 />
          Delete
          <div className="absolute h-full hidden group-hover:block bg-blue-4 top-0 left-0 w-0.5"></div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default TaskCellAction;
