import { USER_AVATAR_URL } from '@/constants/common';
import { useInfiniteGetComments } from '@/services/task-comment-service';
import Image from 'next/image';
import Comment from './Comment';
import { timeAgo } from '@/utils/dayjs';
import CommentController from './CommentController';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type Props = {
  taskId: string;
  prjId: string;
};

const CommentList = ({ taskId, prjId }: Props) => {
  const {
    data: comments,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteGetComments(taskId, prjId);

  if (comments?.length === 0) return null;

  return (
    <div className="flex flex-col gap-10 mt-6">
      {comments?.map((comment) => (
        <div key={comment.id} className="flex items-start gap-3">
          <Image
            src={comment.author.profile_image || USER_AVATAR_URL}
            width={32}
            height={32}
            alt=""
          />
          <div className="flex flex-col">
            <div className="flex items-end gap-4 mb-2">
              <span className="text-sm font-semibold">{comment.author.full_name}</span>
              <span className="text-xs text-gray-4">{timeAgo(comment.created_at)}</span>
            </div>
            <Comment content={comment.comment_content} />
            <CommentController />
          </div>
        </div>
      ))}
      {isFetching && <Loader2 className="animate-spin" />}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()} className="w-fit" variant={'link'} size={'sm'}>
          Load more comments
        </Button>
      )}
    </div>
  );
};
export default CommentList;
