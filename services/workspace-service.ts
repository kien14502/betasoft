import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';

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

export const launchWorkspace = async (org_id: string) => {
  const res = await axios.post(API_ENDPOINT.WORKSPACE.LAUNCH, {
    org_id,
  });
  return res.data;
};
