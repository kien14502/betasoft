import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ReactNode, useEffect, useState, MouseEvent } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { cn, searchChar } from '@/lib/utils';
import { ChevronUp, Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

type Option = {
  label: string;
  value: string;
};

type Props<T extends Option> = {
  placeholder?: string | ReactNode;
  options: T[];
  renderItem?: (value: T) => ReactNode;
  isSearch?: boolean;
  onChange: (values: T[]) => void;
  showItem?: number;
  prefix?: ReactNode;
  isCheckbox?: boolean;
};

const MultipleSelect = <T extends Option>({
  placeholder = '',
  options,
  renderItem,
  onChange,
  isSearch = false,
  showItem = 1,
  prefix,
  isCheckbox = true,
}: Props<T>) => {
  const [itemsSelected, setItemsSelected] = useState<T[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSelected = (item: T) => {
    setItemsSelected((prev) => {
      if (prev.find((_item) => _item.value === item.value)) {
        return prev.filter((_item) => _item.value !== item.value);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeItem = (e: MouseEvent<HTMLDivElement>, item: T) => {
    e.preventDefault();
    setItemsSelected((prev) => prev.filter((_item) => _item.value !== item.value));
  };

  const isSelected = (value: string) => {
    return itemsSelected.some((item) => item.value === value);
  };

  const removeAll = () => setItemsSelected([]);

  useEffect(() => {
    onChange(itemsSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsSelected]);

  const totalItemsSelected = itemsSelected.length;
  const filterItemSelected = options.filter((item) => searchChar(item.label, searchInput));
  const itemsToHide = itemsSelected.slice(showItem, totalItemsSelected);
  const itemsToShow = itemsSelected.slice(0, showItem);

  return (
    <Popover open={openModal} onOpenChange={setOpenModal}>
      <PopoverTrigger asChild>
        <Button
          suppressHydrationWarning
          variant={'outline'}
          className={cn(
            'flex items-center gap-2 h-7 shadow-secondary! rounded-md text-xs font-normal',
            openModal && 'border-blue-4',
          )}
        >
          {prefix && prefix}
          {totalItemsSelected > 0 ? (
            <>
              {itemsToShow.map((item) => (
                <div key={item.value} className="relative">
                  {renderItem ? <>{renderItem(item)}</> : <span>{item.label}</span>}
                  <div
                    className="bg-gray-4 rounded-full absolute -top-2 -right-2"
                    onClick={(e) => removeItem(e, item)}
                    suppressHydrationWarning
                  >
                    <X className="size-3" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            placeholder
          )}

          {itemsToHide.length > 0 && (
            <HoverCard>
              <HoverCardTrigger className="px-1 text-center text-[10px] bg-blue-3 text-white!">
                +{itemsToHide.length}
              </HoverCardTrigger>
              <HoverCardContent
                onClick={(e) => e.preventDefault()}
                className="p-1 flex items-center gap-2 flex-wrap"
              >
                {itemsToHide.map((item) => (
                  <div key={item.value} className="relative">
                    {renderItem ? <>{renderItem(item)}</> : <span>{item.label}</span>}
                    <div
                      className="bg-gray-4 rounded-full absolute -top-2 -right-2"
                      onClick={(e) => removeItem(e, item)}
                    >
                      <X className="size-3" />
                    </div>
                  </div>
                ))}
              </HoverCardContent>
            </HoverCard>
          )}
          <ChevronUp
            className={cn('transition-all duration-300', openModal && 'rotate-180')}
            size={16}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 rounded-none border-gray-2 shadow-popup">
        {isSearch && (
          <div className="flex items-center h-10 p-3 border-b border-gray-5">
            <Search size={16} />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.currentTarget.value)}
              placeholder={'Search ' + placeholder}
              className="outline-none text-xs border-none flex-1 focus-visible:ring-0 ring-0 shadow-none"
            />
          </div>
        )}
        {filterItemSelected.length > 0 ? (
          <>
            {filterItemSelected.map((item) => (
              <div
                onClick={() => handleSelected(item)}
                className="py-2 px-3 flex items-center gap-2 cursor-pointer relative group hover:bg-gray-1"
                key={item.value}
              >
                {isCheckbox && (
                  <Checkbox
                    onChange={() => handleSelected(item)}
                    checked={isSelected(item.value)}
                  />
                )}
                {renderItem ? renderItem(item) : <div>{item.label}</div>}
                <div className="absolute w-0.5 h-full hidden group-hover:block top-0 left-0 bg-blue-4"></div>
              </div>
            ))}
          </>
        ) : (
          <div>Not found</div>
        )}

        {itemsSelected.length > 0 && (
          <div className="border-t border-gray-5 p-2 flex justify-end">
            <Button onClick={removeAll} variant={'ghost'} className="text-blue-4 hover:text-blue-4">
              Clear all
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default MultipleSelect;
