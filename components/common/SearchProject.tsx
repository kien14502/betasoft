import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useEffect, useState, useRef } from 'react';
import { Input } from '../ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteProjects } from '@/services/workspace-service';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

const SearchProject = () => {
  const { info } = useAppSelector(getSelector('workspace'));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const searchDebounce = useDebounce(searchValue);
  const { data, refetch, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProjects(info?.id, searchDebounce);
  const inputRef = useRef<HTMLInputElement>(null);
  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  console.log('data', data);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <div className="absolute pl-2 top-0 left-0 h-full flex items-center justify-center pointer-events-none">
            {isFetchingNextPage ? (
              <Loader size={24} className="animate-spin" />
            ) : (
              <Image width={24} height={24} src={'/icons/project.svg'} alt="" />
            )}
          </div>
          <Input
            ref={inputRef}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder="Search projects..."
            className="pl-10 pr-10 transition-all duration-200 focus:ring-2"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        asChild
        align="start"
        className="w-(--radix-popover-trigger-width) border-none p-0 rounded-none"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
        onInteractOutside={(e) => {
          if (!inputRef.current?.contains(e.target as Node)) {
            setIsOpen(false);
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: 'auto' }} // IMPORTANT: Enable pointer events
        >
          <ScrollArea>
            <div className="max-h-[300px] w-full">
              {(data ?? []).length > 0 ? (
                <div className="py-1 w-full">
                  {data?.map((project, index) => (
                    <motion.div
                      key={project.project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="h-12 group flex items-center px-3 hover:bg-accent relative cursor-pointer transition-colors"
                      onClick={() => {
                        console.log('Selected:', project.project.name);
                        setIsOpen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Image width={24} height={24} src={project.project.avatar} alt="" />
                        {project.project.name}
                      </div>
                      <div className="absolute hidden group-hover:block w-0.5 h-full left-0 top-0 bg-blue-4" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results found
                </div>
              )}
              <div ref={targetRef} />
            </div>
          </ScrollArea>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchProject;
