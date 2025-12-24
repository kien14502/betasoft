import ConversationContainer from '../../components/conversation';
import ConversationProviderV2 from '../../components/providers/ConversationProviderV2';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <ConversationProviderV2>
      <ConversationContainer id={id} />
    </ConversationProviderV2>
  );
};
export default Page;
