import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const SearchExpanded = ({ isOpen, setIsOpen }: Props) => {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const searchBar = useRef<HTMLFormElement>(null);

  useClickOutside(searchBar, () => setIsOpen(false));

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const debouncedSearch = useRef(
    _.debounce((value: string) => {
      setDebouncedValue(value);
      // TODO
      // Simulate API call
      // todo call api
    }, 500),
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleClose = () => {
    setIsOpen(false);
    setValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    debouncedSearch(value);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        type="button"
        className={cn('rounded-xl shadow-secondary', isOpen && 'hidden')}
        variant={isOpen ? 'ghost' : 'outline'}
        size={isOpen ? 'icon-sm' : 'icon-lg'}
      >
        <Search />
      </Button>
      <form
        ref={searchBar}
        onSubmit={handleSubmit}
        className={cn(
          'relative flex gap-1 items-center rounded-xl bg-white transition-width duration-200',
          isOpen ? 'flex-1 p-2 shadow-secondary border' : 'w-0 overflow-hidden',
        )}
      >
        <Search size={20} />

        {/* Input field - Visible when expanded */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search..."
          className={`flex-1 bg-transparent text-sm outline-none placeholder:text-stone-400 dark:placeholder:text-stone-600 dark:text-stone-50 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          } transition-opacity duration-200`}
        />

        {isOpen && (
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 text-stone-400 transition-colors hover:text-stone-600 dark:text-stone-600 dark:hover:text-stone-400"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>
    </>
  );
};

export default SearchExpanded;
