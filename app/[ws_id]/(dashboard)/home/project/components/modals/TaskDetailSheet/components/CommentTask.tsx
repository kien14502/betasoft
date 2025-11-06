import { useState } from 'react';
import { SerializedEditorState } from 'lexical';

import { initialValue } from '@/constants/editor';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('@/components/blocks/editor-x/editor').then((mod) => mod.Editor),
  { ssr: false },
);

const CommentTask = () => {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);

  return (
    <div className="overflow-x-hidden">
      <Editor
        onSend={() => {}}
        // editorSerializedState={editorState}
        onSerializedChange={(value) => setEditorState(value)}
        onChange={(value) => console.log(value._nodeMap)}
      />
      No comments
    </div>
  );
};
export default CommentTask;
