import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{ ws_id: string }>;
};

export default async function WorkspacePage({ params }: Props) {
  const { ws_id } = await params;
  redirect(`/${ws_id}/home`);
}
