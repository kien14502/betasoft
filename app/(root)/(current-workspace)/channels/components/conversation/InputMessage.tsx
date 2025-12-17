import { Message } from '@/constants/schemas/task-comment-schema';
import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<Message>;
  callback: () => void;
};

const InputMessage = ({ form, callback }: Props) => {
  const { ref, ...rest } = form.register('content');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const watchContent = form.watch('content');

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [watchContent]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      callback();
    }
  };
  return (
    <textarea
      onKeyDown={handleKeyDown}
      ref={(e) => {
        ref(e);
        textareaRef.current = e;
      }}
      className="h-full text-base [placeholder]:leading-5 leading-5 resize-none outline-none w-full max-h-56 min-h-5"
      placeholder="Write a message…"
      style={{ height: '20px' }}
      {...rest}
      rows={1}
    />
  );
};

export default InputMessage;
