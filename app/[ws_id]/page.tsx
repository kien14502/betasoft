import { redirect } from 'next/navigation';
type Props = {
  params: Promise<{ ws_id: string }>;
};

const LaunchPage = async ({ params }: Props) => {
  const { ws_id } = await params;
  return redirect(`/${ws_id}/home`);
};
export default LaunchPage;
