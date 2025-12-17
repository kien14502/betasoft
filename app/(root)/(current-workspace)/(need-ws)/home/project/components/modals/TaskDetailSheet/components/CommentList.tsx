import { useInfiniteGetComments } from '@/services/task-comment-service';

type Props = {
  taskId: string;
  prjId: string;
};

const CommentList = ({ taskId, prjId }: Props) => {
  const { data: comments } = useInfiniteGetComments(taskId, prjId);

  if (!comments) return <div>No comments</div>;
  return <div></div>;
};
export default CommentList;
