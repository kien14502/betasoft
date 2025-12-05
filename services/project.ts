import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { ResponseSuccess } from '@/interface/common';
import { ProjectDetails } from '@/interface/project';

export const getProject = async (
  id: string,
  accessToken: string,
): Promise<ResponseSuccess<ProjectDetails>> => {
  const res = await axios.get(API_ENDPOINT.PROJECT + `/${id}`, {
    headers: {
      Authorization: 'Bearer' + accessToken,
    },
  });

  return res.data;
};
