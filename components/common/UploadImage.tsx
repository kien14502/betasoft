import { cn } from '@/lib/utils';
import { Trash, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { usePostAuthFileUpload } from '@/app/api/files/files';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  isCallback?: boolean;
};

const UploadImage = ({ value, onChange, isCallback = true }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<Blob | null>(null);
  const { mutate: uploadFile } = usePostAuthFileUpload();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!fileName) return;
    if (isCallback) {
      uploadFile(
        { data: { file: fileName } },
        {
          onSuccess(data) {
            onChange?.(data.data?.url || '');
          },
        },
      );
    } else {
      onChange?.(URL.createObjectURL(fileName));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      setFileName(file);

      if (inputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputRef.current.files = dataTransfer.files;

        const event = new Event('change', { bubbles: true });
        inputRef.current.dispatchEvent(event);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          'relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border bg-muted/30 hover:bg-muted/50',
          fileName && 'hidden',
        )}
      >
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="text-center">
          <p className="font-medium text-foreground">Drag and drop your file here</p>
          <p className="text-sm text-muted-foreground">or click to browse</p>
        </div>
        <input ref={inputRef} type="file" className="hidden" onChange={handleInputChange} />
      </div>
      {(fileName || value) && (
        <div className="relative rounded-md w-fit h-fit overflow-hidden group">
          <Image
            src={value ? value : URL.createObjectURL(fileName as Blob)}
            width={100}
            height={100}
            alt={'avatar'}
          />
          <div className="absolute inset-0 opacity-0 flex items-center justify-center group-hover:opacity-100 transition-opacity">
            <Button variant={'destructive'} size={'icon'} type="button" onClick={removeFile}>
              <Trash />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
export default UploadImage;
