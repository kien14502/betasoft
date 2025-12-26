import { Suspense } from 'react';
import ConversationContainer from '../../components/conversation';
import ConversationProviderV2 from '../../components/providers/ConversationProviderV2';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <ConversationProviderV2>
      <Suspense fallback={<div>Loading messages...</div>}>
        <ConversationContainer id={id} />
      </Suspense>
    </ConversationProviderV2>
  );
};
export default Page;
