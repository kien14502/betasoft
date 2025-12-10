import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { ResponseSuccess } from '@/interface/common';
import { MemberProject, ProjectDetails } from '@/interface/project';
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

export const getMembersProject = async (
  prj_id: string,
): Promise<ResponseSuccess<{ members: MemberProject[]; total: number }>> => {
  const res = await axios.get(API_ENDPOINT.PROJECT.MEMBER(prj_id), {
    params: {
      page: 1,
      page_size: 10,
    },
  });
  return res.data;
};

export const useGetMemberProject = (prj_id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_MEM_PRJ, prj_id],
    queryFn: () => getMembersProject(prj_id),
    enabled: !!prj_id,
    select: ({ data }) => data,
  });
