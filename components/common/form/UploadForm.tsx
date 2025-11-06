'use client';

import type React from 'react';

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import type { FormProps } from '@/interface/common';
import { cn } from '@/lib/utils';
import type { FieldValues } from 'react-hook-form';
import { useRef, useState } from 'react';
import { Trash, Upload } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type Props<T extends FieldValues> = FormProps<T> & {
  isUseCallback?: boolean;
};

const DragDropUpload = <T extends FieldValues>({ name, label, className, control }: Props<T>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

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
      const imgUrl = URL.createObjectURL(file);
      setFileName(imgUrl);

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
      const imgUrl = URL.createObjectURL(file); // Create URL from file
      setFileName(imgUrl);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    setFileName('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn('flex flex-col gap-2 space-y-0', className)}>
          {label && <FormLabel className="mb-2">{label}</FormLabel>}
          <FormControl>
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
                fieldState.error && 'border-destructive',
                fileName && 'hidden',
              )}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="text-center">
                <p className="font-medium text-foreground">
                  {fileName ? fileName : 'Drag and drop your file here'}
                </p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
              <input
                {...field}
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  handleInputChange(e);
                  field.onChange(e);
                }}
              />
            </div>
          </FormControl>
          {fileName && (
            <div className="relative rounded-md w-fit h-fit overflow-hidden group">
              <Image src={fileName} width={100} height={100} alt={fileName} />
              <div className="absolute inset-0 opacity-0 flex items-center justify-center group-hover:opacity-100 transition-opacity">
                <Button variant={'destructive'} size={'icon'} type="button" onClick={removeFile}>
                  <Trash />
                </Button>
              </div>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DragDropUpload;
