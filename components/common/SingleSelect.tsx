import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useEffect } from 'react';

type Option = {
  label: string;
  value: string;
};

type Props<T extends Option> = {
  trigger: ReactNode;
  options: T[];
  onChange: (value: T) => void;
  prefix?: ReactNode;
  value: string;
  renderItem?: (value: T) => ReactNode;
  classNames?: {
    trigger?: string;
    content?: string;
  };
  label?: string;
};

const SingleSelect = <T extends Option>({
  onChange,
  options,
  trigger,
  value,
  prefix,
  renderItem,
  classNames,
  label,
}: Props<T>) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [itemSelected, setItemSeleted] = useState<T | undefined>(
    options.find((item) => item.value === value),
  );

  useEffect(() => {
    if (itemSelected !== undefined) {
      onChange(itemSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected]);

  return (
    <Popover open={openModal} onOpenChange={setOpenModal}>
      <PopoverTrigger asChild className="">
        <div className="w-full flex flex-col gap-1">
          {label && <span className="text-sm font-semibold">{label}</span>}
          <Button
            type="button"
            variant={'outline'}
            className={cn(
              'flex items-center justify-start gap-2 relative h-8 shadow-popup! rounded-none  border border-gray-5',
              openModal && 'border-blue-4',
              classNames?.trigger,
            )}
          >
            {prefix && prefix}
            {!itemSelected ? (
              trigger
            ) : (
              <>
                {renderItem ? <>{renderItem(itemSelected)}</> : <span>{itemSelected.label}</span>}
              </>
            )}
            <ChevronUp
              className={cn(
                'transition-all absolute right-2 duration-300',
                openModal && 'rotate-180',
              )}
              size={16}
            />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'p-0 rounded-none border-gray-2 shadow-popup',
          'sm:min-w-[var(--radix-popover-trigger-width)]',
          classNames?.content,
        )}
      >
        {options.map((option) => (
          <div
            className="py-2 px-3 flex items-center gap-2 cursor-pointer relative group hover:bg-gray-1"
            onClick={() => setItemSeleted(option)}
            key={option.value}
          >
            {renderItem ? renderItem(option) : <>{option.label}</>}
            <div className="absolute w-0.5 h-full hidden group-hover:block top-0 left-0 bg-blue-4" />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
export default SingleSelect;
