import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Message, messageSchema } from '@/constants/schemas/task-comment-schema';
import { commingSoonToast, encodeBase64 } from '@/utils/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mic, Smile } from 'lucide-react';
import Image from 'next/image';
import { memo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import MessageUpload from './MessageUpload';
import InputMessage from './InputMessage';
import { usePostChatRoomId } from '@/app/api/messages/messages';
import { useUploadFile } from '@/services/upload';
import ImagePreview from './ImagePreview';

type Props = {
  id: string;
  onBottomMessage: () => void;
};

const ConversationController = ({ id, onBottomMessage }: Props) => {
  const imageOrVideoRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending: uploadImgLoading } = useUploadFile();

  const form = useForm<Message>({
    defaultValues: { content: '', images: [], file: '' },
    resolver: zodResolver(messageSchema),
  });
  const { mutate: createMessage } = usePostChatRoomId();

  const handleOnChangeImageOrVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        console.log('file', file);

        upload(file, {
          onSuccess: ({ data }) => {
            console.log('data', data);

            // Use functional update to avoid race conditions
            const currentImages = form.getValues('images') ?? [];
            form.setValue('images', [...currentImages, data?.url || '']);
          },
        });
      });
    }
    e.target.value = '';
  };

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
  const images = form.watch('images');

  const onClickImageOrVideo = () => {
    imageOrVideoRef.current?.click();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSend)} className="flex py-4 px-6 items-end gap-2.5">
        <MessageUpload uploadVideoImage={onClickImageOrVideo} />
        <div className="w-full focus-within:border-blue-500 transition-colors px-4 py-3.5 flex items-end flex-1 border border-blue-4 bg-[#006EFF1A] rounded-3xl">
          <div className="flex flex-col gap-4 flex-1">
            {images && images?.length > 0 && (
              <div className="w-full flex gap-4">
                <button
                  className="p-3 rounded-xl bg-blue-3 shadow-secondary"
                  onClick={onClickImageOrVideo}
                >
                  <Image width={24} height={24} src={'/icons/gallery-plus.svg'} alt="gallery" />
                </button>
                {images.map((image, index) => (
                  <ImagePreview
                    onRemove={() =>
                      form.setValue(
                        'images',
                        images.filter((_, i) => i !== index),
                      )
                    }
                    key={index}
                    url={image}
                  />
                ))}
                {uploadImgLoading && (
                  <div className="h-12 w-12 bg-blue-3 rounded-xl shadow-secondary flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" />
                  </div>
                )}
              </div>
            )}
            <InputMessage form={form} callback={handleCallback} />
          </div>
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
        <input
          ref={imageOrVideoRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          multiple
          onChange={handleOnChangeImageOrVideo}
        />
      </form>
    </Form>
  );
};

export default memo(ConversationController);
