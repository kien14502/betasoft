import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { ResponseSuccess } from '@/interface/common';
import { ProjectData } from '@/interface/task';
import { useQuery } from '@tanstack/react-query';

export const getListTasks = async (
  org_id: string,
): Promise<
  ResponseSuccess<{
    projects: ProjectData[];
    total: string;
  }>
> => {
  const res = await axios.get(API_ENDPOINT.PROJECT.MY_PROJ + `/${org_id}`, {
    params: {
      page: 1,
      page_size: 10,
    },
  });
  return res.data;
};

// hooks

export const useGetListTasks = (org_id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_TASKS, org_id],
    queryFn: () => getListTasks(org_id),
    enabled: !!org_id,
    select: (res) => res.data.projects,
  });
