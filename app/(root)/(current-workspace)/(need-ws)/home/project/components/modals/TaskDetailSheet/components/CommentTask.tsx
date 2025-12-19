import { useState, useRef } from 'react';
import { SerializedEditorState } from 'lexical';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import CommentList from './CommentList';
import { usePathname } from 'next/navigation';
import { useCreateTaskComment } from '@/services/task-comment-service';
import { useToggle } from '@/hooks/useToggle';
import { useClickOutside } from '@/hooks/useClickOutside';
import { initialValue } from '@/constants/editor';

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
  const [isEditorOpen, { toggle }] = useToggle();
  const { mutate: createComment } = useCreateTaskComment();

  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => {
    if (isEditorOpen) toggle();
  });

  return (
    <div ref={wrapperRef} className="min-h-0 flex flex-col pb-10">
      {isEditorOpen ? (
        <Editor
          classNames={{
            plugins: 'shadow-secondary max-h-[300px] min-h-[204px]',
          }}
          onSend={() => {
            createComment({
              content: JSON.stringify(editorState),
              mentions: [],
              project_id: pathName,
              task_id: taskId,
            });
            setEditorState(initialValue);
          }}
          editorSerializedState={editorState}
          onSerializedChange={setEditorState}
        />
      ) : (
        <Button
          onClick={toggle}
          size="sm"
          className="shadow-secondary border-gray-2 rounded-none"
          variant="outline"
        >
          Add a comment ...
        </Button>
      )}

      <CommentList taskId={taskId} prjId={pathName} />
    </div>
  );
};

export default CommentTask;
