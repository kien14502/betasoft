import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

const API_BASE_URL = process.env.BE_BASE_URL ?? process.env.NEXT_PUBLIC_BE_BASE_URL;

async function fetchProject(id: string, token: string) {
  if (!API_BASE_URL) {
    throw new Error('API base URL is not configured');
  }

  const res = await fetch(`${API_BASE_URL}/auth/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to load project');

  return res.json();
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  const token = (await cookies()).get('accessToken')?.value;
  if (!token) {
    redirect('/login');
  }

  const project = await fetchProject(id, token);
  if (!project || project.workspaceId !== project.currentWorkspaceId) {
    notFound();
  }

  redirect(`/home/project/${id}/summary`);
}
