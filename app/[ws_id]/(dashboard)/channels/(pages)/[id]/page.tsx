import ConversationContainer from '../../components/converstation';

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  return <ConversationContainer />;
};

export default Page;
