import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Message, messageSchema } from '@/constants/schemas/task-comment-schema';
import { commingSoonToast, encodeBase64 } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mic, Smile } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import MessageUpload from './MessageUpload';
import InputMessage from './InputMessage';
import { usePostChatRoomId } from '@/app/api/messages/messages';

type Props = {
  id: string;
  onBottomMessage: () => void;
};

const ConversationController = ({ id, onBottomMessage }: Props) => {
  const form = useForm<Message>({
    defaultValues: { content: '', images: [], file: '' },
    resolver: zodResolver(messageSchema),
  });
  const { mutate: createMessage } = usePostChatRoomId();

  const onSend = (values: Message) => {
    createMessage(
      {
        roomId: id,
        data: { content: encodeBase64(values.content), type_content: 1 },
      },
      {
        onSuccess: () => {
          onBottomMessage();
        },
      },
    );

    form.reset();
  };

  const handleCallback = () => {
    form.handleSubmit(onSend)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSend)} className="flex py-4 px-6 items-end gap-2.5">
        <MessageUpload form={form} />
        <div className="w-full focus-within:border-blue-500 transition-colors px-4 py-3.5 flex items-end flex-1 border border-blue-4 bg-[#006EFF1A] rounded-3xl">
          <InputMessage form={form} callback={handleCallback} />
          <Button type="button" size={'icon-xs'} variant={'ghost'}>
            <Smile />
          </Button>
          <Button onClick={commingSoonToast} type="button" size={'icon-xs'} variant={'ghost'}>
            <Mic />
          </Button>
        </div>
        <Button className="rounded-full mb-2" type="submit" variant={'active'} size={'icon-lg'}>
          <Image width={20} height={20} src={'/icons/send-white.svg'} alt="" />
        </Button>
      </form>
    </Form>
  );
};

export default memo(ConversationController);
