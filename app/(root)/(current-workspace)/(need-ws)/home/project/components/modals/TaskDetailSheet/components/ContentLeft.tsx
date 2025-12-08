import TabsContent from '@/components/common/TabsContent';
import { Button } from '@/components/ui/button';
import { Clock, CornerDownRight, MessageSquare } from 'lucide-react';
import CommentTask from './CommentTask';
import TaskActivity from './TaskActivity';
import { Task } from '@/interface/task';

type Props = {
  task: Task;
};

const ContentLeft = ({ task }: Props) => {
  return (
    <div className="col-span-3 px-8 py-6 flex flex-col gap-6">
      <p className="text-[18px] font-semibold">{task.title}</p>
      <Button className="w-fit bg-blue-1 hover:bg-blue-3 text-blue-5 py-1.5 px-3 rounded-[8px]">
        <CornerDownRight size={20} />
        Add subtask
      </Button>
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
