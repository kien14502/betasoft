import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Upload, Image as ImageIcon, CalendarPlus, ListCheck } from 'lucide-react';
import Image from 'next/image';
import ButtonHover from '../ButtonHover';
import { useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Message } from '@/constants/schemas/task-comment-schema';

type Props = {
  form: UseFormReturn<Message>;
};

const MessageUpload = ({}: Props) => {
  const imageOrVideoRef = useRef<HTMLInputElement>(null);
  const uploadFileRef = useRef<HTMLInputElement>(null);

  const handleImageOrVideoClick = () => {
    imageOrVideoRef.current?.click();
  };
  const handleUploadFileClick = () => {
    uploadFileRef.current?.click();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" className="rounded-full mb-2" variant={'ghost'} size={'icon-lg'}>
          <Image width={20} height={20} src={'/icons/attach-circle.svg'} alt="" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 rounded-none flex py-2 flex-col sm:max-w-[157px]"
        align="start"
      >
        <ButtonHover
          onClick={handleImageOrVideoClick}
          isHover={true}
          className="rounded-none py-2 px-4 justify-start"
          variant={'ghost'}
        >
          <ImageIcon /> Photo or video
        </ButtonHover>
        <ButtonHover
          onClick={handleUploadFileClick}
          isHover={true}
          className="rounded-none py-2 px-4 justify-start"
          variant={'ghost'}
        >
          <Upload /> Upload file
        </ButtonHover>
        <ButtonHover
          isHover={true}
          className="rounded-none py-2 px-4 justify-start"
          variant={'ghost'}
        >
          <CalendarPlus /> Create reminder
        </ButtonHover>
        <ButtonHover
          isHover={true}
          className="rounded-none py-2 px-4 justify-start"
          variant={'ghost'}
        >
          <ListCheck /> Task in chat
        </ButtonHover>

        {/* input file change */}

        {/* accept video & image files */}
        <input
          ref={imageOrVideoRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          multiple
        />

        {/* accept file docs excel pdf*/}
        <input
          ref={uploadFileRef}
          type="file"
          accept=".doc,.docx,.xls,.xlsx,.pdf"
          className="hidden"
        />
      </PopoverContent>
    </Popover>
  );
};

export default MessageUpload;
