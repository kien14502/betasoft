import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Upload, Image as ImageIcon, CalendarPlus, ListCheck } from 'lucide-react';
import Image from 'next/image';
import ButtonHover from '../ButtonHover';

type Props = {
  uploadVideoImage?: () => void;
  uploadFile?: () => void;
  createReminder?: () => void;
  createTaskInChat?: () => void;
};

const MessageUpload = ({ uploadVideoImage }: Props) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button type="button" className="rounded-full mb-2" variant={'ghost'} size={'icon-lg'}>
        <Image width={20} height={20} src={'/icons/attach-circle.svg'} alt="" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="p-0 rounded-none flex py-2 flex-col sm:max-w-[157px]" align="start">
      <ButtonHover
        isHover={true}
        className="rounded-none py-2 px-4 justify-start"
        variant={'ghost'}
        onClick={uploadVideoImage}
      >
        <ImageIcon /> Photo or video
      </ButtonHover>
      <ButtonHover
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
    </PopoverContent>
  </Popover>
);

export default MessageUpload;
