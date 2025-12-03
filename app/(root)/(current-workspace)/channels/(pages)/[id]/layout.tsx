import { ReactNode } from 'react';
import { ConversationProvider } from '../../components/providers/ConverstationProvider';

type Props = {
  params: Promise<{ id: string }>;
  children: ReactNode;
};

const Layout = async ({ children, params }: Props) => {
  const { id } = await params;

  return <ConversationProvider roomId={id}>{children}</ConversationProvider>;
};

export default Layout;
