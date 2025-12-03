import { useGetTaskComments } from '@/services/task-comment-service';

type Props = {
  taskId: string;
};

const CommentList = ({ taskId }: Props) => {
  //   const { data } = useGetTaskComments({ taskID: taskId, page: 1, page_size: 10 });

  //   if (!data) return <div>No comments</div>;
  return <div></div>;
};
export default CommentList;
