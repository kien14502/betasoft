import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { memo, useEffect, useState } from 'react';
import { ChevronDown, Loader, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteProjects } from '@/services/workspace-service';
import { getSelector, useAppSelector } from '@/hooks/useRedux';
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { Button } from '../ui/button';
import { ProjectData } from '@/interface/task';
import { cn } from '@/lib/utils';

type Props = { onChange: (prj: ProjectData) => void };

const SearchProject = memo(({ onChange }: Props) => {
  const { info } = useAppSelector(getSelector('workspace'));
  const [prjSelected, setPrjSelected] = useState<ProjectData | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const searchDebounce = useDebounce(searchValue);
  const { data, refetch, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteProjects(info?.id, searchDebounce);
  const { targetRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetchingNextPage,
    onLoadMore: fetchNextPage,
  });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDebounce]);

  useEffect(() => {
    if (!prjSelected) return;
    onChange(prjSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prjSelected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'flex border p-3 gap-2 h-12 w-full shadow-secondary',
          open && 'border-blue-4 border-2',
        )}
      >
        <Image
          src={prjSelected ? prjSelected.project.avatar : '/icons/project.svg'}
          width={24}
          height={24}
          alt=""
        />
        <div className="flex-1 flex items-start">
          {prjSelected ? prjSelected.project.name : 'Select Project'}
        </div>
        <ChevronDown size={24} />
      </PopoverTrigger>
      <PopoverContent
        className="w-(--radix-popper-anchor-width) p-0 rounded-none min-h-96 border-0"
        align="start"
      >
        <div className="w-full p-2 gap-1 flex items-center shadow-secondary">
          {isLoading ? <Loader className="animate-spin" size={20} /> : <Search size={20} />}
          <input
            className="outline-none text-sm"
            value={searchValue}
            placeholder="Search project ..."
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
        </div>
        <ScrollArea className="">
          <div className="flex flex-col py-2">
            {data?.map((item) => (
              <Button
                variant={'ghost'}
                className="p-2 rounded-none relative group justify-start font-medium"
                key={item.project.id}
                onClick={() => setPrjSelected(item)}
              >
                <Image src={item.project.avatar} width={24} height={24} alt="" />
                {item.project.name}
                <div className="absolute w-0.5 group-hover:block hidden h-full bg-blue-4 top-0 left-0" />
              </Button>
            ))}
            <div ref={targetRef} />
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
});

SearchProject.displayName = 'SearchProject';

export default SearchProject;
