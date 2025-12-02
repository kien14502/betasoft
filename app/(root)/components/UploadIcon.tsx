import { usePostAuthFileUpload } from '@/app/api/files/files';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

type Props = {
  onFileSelect?: (url: string | undefined) => void;
};

const UploadIcon = ({ onFileSelect }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending, data, reset } = usePostAuthFileUpload();

  const onClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (file) {
      upload(
        { data: { file } },
        {
          onSuccess({ data }) {
            if (onFileSelect) {
              onFileSelect(data?.url);
            }
          },
        },
      );
    }
  };

  const handleClearImage = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    if (onFileSelect) {
      onFileSelect(undefined);
    }
    reset();
  };

  const imgUrl = data?.data?.url;

  return (
    <div className="flex items-center gap-3">
      <div className="rounded-[20px] group relative">
        <Image
          src={imgUrl || '/images/icon-example.png'}
          className={cn('object-content rounded-[20px] shrink-0', isPending && 'hidden')}
          width={56}
          height={56}
          alt=""
        />
        {isPending && <Skeleton className="w-14 h-14 inset-0 rounded-[20px]" />}
        {imgUrl && (
          <div className="rounded-[20px] hidden group-hover:flex items-center justify-center absolute inset-0 bg-[#00000080]">
            <Button onClick={handleClearImage} type="button" size={'icon-sm'} variant={'link'}>
              <Image src={'/icons/bin.svg'} width={20} height={20} alt="" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex gap-1 flex-col">
        <span className="text-xs text-gray-4">Set an icon</span>
        <Button
          disabled={isPending}
          onClick={onClick}
          type="button"
          variant={'outline'}
          size={'sm'}
        >
          <Upload size={20} />
          Upload image
        </Button>
        <input
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
          type="file"
          className="hidden"
          ref={inputRef}
        />
      </div>
    </div>
  );
};
export default UploadIcon;
