import { Message } from '@/constants/schemas/task-comment-schema';
import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';

type Props = {
  form: UseFormReturn<Message>;
};

const InputMessage = ({ form }: Props) => {
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

  return (
    <textarea
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
