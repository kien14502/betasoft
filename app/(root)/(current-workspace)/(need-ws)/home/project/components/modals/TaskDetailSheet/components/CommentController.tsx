import { Button } from '@/components/ui/button';
import { Copy, Edit } from 'iconsax-reactjs';
import { CornerDownRight, Ellipsis } from 'lucide-react';

const CommentController = () => {
  return (
    <div className="flex items-center gap-3 mt-4">
      <Button variant={'ghost'} size={'icon-xs'}>
        <CornerDownRight color="#25314C" />
      </Button>
      <Button variant={'ghost'} size={'icon-xs'}>
        <Edit color="#25314C" variant="Outline" />
      </Button>
      <Button variant={'ghost'} size={'icon-xs'}>
        <Copy color="#25314C" variant="Outline" />
      </Button>
      <Button variant={'ghost'} size={'icon-xs'}>
        <Ellipsis color="#25314C" />
      </Button>
    </div>
  );
};
export default CommentController;
