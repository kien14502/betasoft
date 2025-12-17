import ConversationContainer from '../components/conversation';
import ConversationProviderV2 from '../components/providers/ConversationProviderV2';

type Props = {
  params: Promise<{ id: string[] }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const roomId = id[1];
  const type = id[0];

  return (
    <ConversationProviderV2>
      <ConversationContainer id={roomId} type={type} />
    </ConversationProviderV2>
  );
};

export default Page;
