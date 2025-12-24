'use client';
import { useEffect, useState } from 'react';
import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { nodes } from '@/components/blocks/editor-x/nodes';

type Props = {
  content: string;
};

const Comment = ({ content }: Props) => {
  const [html, setHtml] = useState('');

  useEffect(() => {
    // Create editor with all necessary nodes
    const editor = createEditor({
      nodes: nodes,
    });

    try {
      const editorState = editor.parseEditorState(content);

      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        setHtml(htmlString);
      });
    } catch (error) {
      console.error('Error parsing editor state:', error);
      setHtml('<p>Error loading content</p>');
    }
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Comment;
