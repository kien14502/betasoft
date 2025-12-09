import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { ResponseSuccess } from '@/interface/common';
import { ProjectDetails } from '@/interface/project';
import { useQuery } from '@tanstack/react-query';

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

export const getMembersProject = () => {};

export const useGetMemberProject = () =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MEM_PRJ],
  });
