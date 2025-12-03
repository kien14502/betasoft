import { getRoom } from '@/services/conversation-service';
import { ReactNode } from 'react';
import { ConversationProvider } from '../../components/providers/ConverstationProvider';
import { SearchX } from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
  children: ReactNode;
};

const Layout = async ({ children, params }: Props) => {
  const { id } = await params;

  const res = await getRoom(id, {
    page: 1,
    page_size: 10,
  });

  if (!res)
    return (
      <div className="h-full w-full flex gap-2 items-center justify-center">
        <SearchX className="text-blue-4" />
        Conversation not exist
      </div>
    );

  return <ConversationProvider roomId={id}>{children}</ConversationProvider>;
};

export default Layout;
