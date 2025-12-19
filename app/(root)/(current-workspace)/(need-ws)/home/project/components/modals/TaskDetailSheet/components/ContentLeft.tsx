import TabsContent from '@/components/common/TabsContent';
import { Clock, MessageSquare } from 'lucide-react';
import CommentTask from './CommentTask';
import TaskActivity from './TaskActivity';
import { Task } from '@/interface/task';
import AddSubtask from './AddSubtask';
import ListSubtasks from './ListSubtasks';

type Props = {
  task: Task;
};

const ContentLeft = ({ task }: Props) => {
  return (
    <div className="col-span-3 px-8 py-6 flex flex-col gap-6 overflow-x-hidden">
      <p className="text-[18px] font-semibold">{task.title}</p>
      <ListSubtasks task_id={task.id} />
      <AddSubtask />
      <TabsContent
        contents={[
          { body: <CommentTask taskId={task.id || ''} />, value: 'Comment' },
          { body: <TaskActivity />, value: 'Activities' },
        ]}
        defaultValue="Comment"
        tabs={[
          { label: 'Comment', value: 'Comment', icon: MessageSquare },
          { label: 'Activities', value: 'Activities', icon: Clock },
        ]}
      />
    </div>
  );
};
export default ContentLeft;
