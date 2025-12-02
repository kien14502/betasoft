'use client';

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type Props = {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  prefix?: ReactNode;
};

export function DatePicker({ onChange, value, label, placeholder = 'Select date', prefix }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      {label && <Label htmlFor="date">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={cn(
              'flex justify-start',
              'w-48 font-normal border border-gray-5',
              'gap-2 relative h-12 shadow-popup! rounded-none',
              open && 'border-blue-4',
            )}
          >
            {prefix && prefix}
            {value ? value.toLocaleDateString() : placeholder}
            <ChevronDownIcon className="ml-auto" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
