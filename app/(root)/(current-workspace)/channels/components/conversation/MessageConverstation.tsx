'use client';

import { Editor } from '@/components/blocks/editor-x/editor';
import { initialValue } from '@/constants/editor';
import { SerializedEditorState } from 'lexical';
import { useState } from 'react';

const MessageConverstation = () => {
  const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue);

  const onSend = () => {
    // TODO
    console.log('editorState', JSON.stringify(editorState.root));
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <div className="h-10">Header</div>
      <div className="flex-1 overflow-x-hidden shrink-0">content</div>
      <div className="w-full p-2">
        <Editor
          editorSerializedState={editorState}
          onSerializedChange={(value) => setEditorState(value)}
          onSend={onSend}
          placeholder="Enter..."
          classNames={{
            plugins: 'min-h-none max-h-40',
          }}
        />
      </div>
    </div>
  );
};

export default MessageConverstation;
