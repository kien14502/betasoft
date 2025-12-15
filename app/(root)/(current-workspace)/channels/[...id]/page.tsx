import ConversationContainer from '../components/conversation';

type Props = {
  params: Promise<{ id: string[] }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  const roomId = id[1];
  const type = id[0];

  return <ConversationContainer id={roomId} type={type} />;
};

export default Page;
