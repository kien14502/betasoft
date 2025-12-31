import { Suspense } from 'react';
import ConversationContainer from '../components/conversation';
import ConversationProviderV2 from '../components/providers/ConversationProviderV2';
import EmptyConversation from '../components/EmptyConversation';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const id = slug[1];

  if (!id) return <EmptyConversation />;

  return (
    <ConversationProviderV2>
      <Suspense fallback={<div>Loading messages...</div>}>
        <ConversationContainer id={id} />
      </Suspense>
    </ConversationProviderV2>
  );
};
export default Page;
