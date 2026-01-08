import { ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';

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
  classNames?: { trigger?: string; content?: string };
  label?: string;
  require?: boolean;
  disable?: boolean;
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
  require,
  disable = false,
}: Props<T>) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<T | undefined>(undefined);

  useEffect(() => {
    const foundItem = options.find((item) => item.value === value);
    setItemSelected(foundItem);
  }, [value, options]);

  useEffect(() => {
    if (itemSelected !== undefined) {
      onChange(itemSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemSelected]);

  return (
    <Popover open={openModal && !disable} onOpenChange={!disable ? setOpenModal : () => {}}>
      <PopoverTrigger asChild>
        <div className="w-full flex flex-col gap-1">
          {label && (
            <span className="text-sm flex items-top gap-1 font-semibold">
              {label}
              {require && <Image width={6} height={6} src={'/icons/asterisk.svg'} alt="" />}
            </span>
          )}
          <Button
            disabled={disable}
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
          'sm:min-w-(--radix-popover-trigger-width)',
          classNames?.content,
        )}
      >
        {options.length === 0 && (
          <div className="p-4 text-gray-8 text-sm font-medium">Not found items</div>
        )}
        {options.map((option) => (
          <div
            className="py-2 px-3 flex items-center gap-2 cursor-pointer relative group hover:bg-gray-1"
            onClick={() => setItemSelected(option)}
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
