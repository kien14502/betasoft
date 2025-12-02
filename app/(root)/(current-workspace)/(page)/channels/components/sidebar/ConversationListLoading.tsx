import { Skeleton } from '@/components/ui/skeleton';

const ConversationListLoading = () => (
  <div className="flex flex-col w-full">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton className="h-14 w-full rounded-2xl" key={i} />
    ))}
  </div>
);
export default ConversationListLoading;
