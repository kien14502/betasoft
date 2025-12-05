import ConversationContainer from '../../components/conversation';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <ConversationContainer id={id} />;
};

export default Page;
