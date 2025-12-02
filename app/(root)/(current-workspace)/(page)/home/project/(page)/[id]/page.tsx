import { notFound, redirect } from 'next/navigation';
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id) {
    notFound();
  } else {
    redirect(`${id}/summary`);
  }
}
