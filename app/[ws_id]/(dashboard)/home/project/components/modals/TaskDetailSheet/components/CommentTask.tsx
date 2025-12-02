import { useState } from 'react';
import { SerializedEditorState } from 'lexical';

import { initialValue } from '@/constants/editor';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import CommentList from './CommentList';

const Editor = dynamic(
  () => import('@/components/blocks/editor-x/editor').then((mod) => mod.Editor),
  { ssr: false },
);

type Props = {
  taskId: string;
};

const CommentTask = ({ taskId }: Props) => {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <div className="min-h-0 flex flex-col">
      {isEditorOpen ? (
        <Editor
          classNames={{
            plugins: 'shadow-secondary max-h-[200px] min-h-[104px]',
          }}
          onSend={() => {}}
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          onChange={(value) => console.log(value._nodeMap)}
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

      <CommentList taskId={taskId} />
    </div>
  );
};
export default CommentTask;
