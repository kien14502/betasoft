import { useState } from 'react';
import { SerializedEditorState } from 'lexical';

import { initialValue } from '@/constants/editor';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import CommentList from './CommentList';
import { usePathname } from 'next/navigation';
import { useCreateTaskComment } from '@/services/task-comment-service';

const Editor = dynamic(
  () => import('@/components/blocks/editor-x/editor').then((mod) => mod.Editor),
  { ssr: false },
);

type Props = {
  taskId: string;
};

const CommentTask = ({ taskId }: Props) => {
  const pathName = usePathname().split('/').filter(Boolean)[2];
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { mutate: createComment } = useCreateTaskComment();

  return (
    <div className="min-h-0 flex flex-col">
      {isEditorOpen ? (
        <Editor
          classNames={{
            plugins: 'shadow-secondary max-h-[200px] min-h-[104px]',
          }}
          onSend={() =>
            createComment({
              content: JSON.stringify(editorState),
              mentions: [],
              project_id: pathName,
              task_id: taskId,
            })
          }
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          // onChange={(value) => console.log(value._nodeMap)}
        />
      ) : (
        <Button
          onClick={() => setIsEditorOpen(true)}
          size={'sm'}
          className="shadow-secondary border-gray-2 rounded-none"
          variant={'outline'}
        >
          Add a comment ...
        </Button>
      )}

      <CommentList taskId={taskId} prjId={pathName} />
    </div>
  );
};
export default CommentTask;
