import { axios } from '@/config/axios';

export const getListWorkspace = async (org_id: string, accessToken: string) => {
  const res = await axios.get(`/auth/organizations/${org_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.data;
  if (!data) return null;
  return data;
};
