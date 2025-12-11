import { axios } from '@/config/axios';
import { PAGE_SIZE } from '@/constants/common';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import {
  InviteMemberSchemaType,
  JoinWorkspaceSchema,
  NewWorkSpaceSchemaType,
} from '@/constants/schemas/workspace-schema';
import { User } from '@/interface/auth';
import { ResponseSuccess } from '@/interface/common';
import { ProjectData } from '@/interface/task';
import { DetailWorkspace, Organization, ProjectParam } from '@/interface/workspace';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { GenericAbortSignal } from 'axios';

export const getListWorkspace = async (
  pageParam: number = 1,
): Promise<ResponseSuccess<{ organizations: Organization[]; total: number }>> => {
  const res = await axios.get(API_ENDPOINT.WORKSPACE[''], {
    params: {
      page: pageParam,
      page_size: 10,
    },
  });
  return res.data;
};

export const createWorkspace = async (payload: NewWorkSpaceSchemaType) => {
  const res = await axios.post(API_ENDPOINT.WORKSPACE[''], payload);
  return res.data;
};

export const getInfiniteWorkspace = async (pageParam: number = 1) => {
  const res = await axios.get<ResponseSuccess<{ organizations: Organization[]; total: number }>>(
    API_ENDPOINT.WORKSPACE[''],
    {
      params: {
        page: pageParam,
        page_size: 10,
      },
    },
  );
  return { ...res.data.data, page: pageParam };
};

export const launchWorkspace = async (
  org_id: string,
): Promise<ResponseSuccess<DetailWorkspace>> => {
  const res = await axios.post(API_ENDPOINT.WORKSPACE.LAUNCH, {
    org_id,
  });
  return res.data;
};

export const joinWorkspace = async (payload: JoinWorkspaceSchema) => {
  const res = await axios.post(API_ENDPOINT.WORKSPACE.JOIN, payload);
  return res.data;
};

export const getWorkspace = async (
  id: string,
  signal?: GenericAbortSignal,
): Promise<ResponseSuccess<DetailWorkspace>> => {
  const res = await axios.get(API_ENDPOINT.WORKSPACE[''] + `/${id}`, {
    signal,
  });
  return res.data;
};

export const addMember = async (payload: InviteMemberSchemaType) => {
  const res = await axios.post(API_ENDPOINT.WORKSPACE.INVITE_MEMBER, payload);
  return res.data;
};

export const getMembersWorkspace = async (
  id: string,
  signal?: GenericAbortSignal,
): Promise<ResponseSuccess<User[]>> => {
  const res = await axios.get(API_ENDPOINT.WORKSPACE[''] + `/${id}/members`, {
    params: {
      page: 1,
      page_size: 10,
    },
    signal,
  });
  return res.data;
};

// export const getListProjects = async (
//   org_id: string,
//   pagination: Pagination,
// ): Promise<
//   ResponseSuccess<{
//     projects: ProjectDetails[];
//     total: number;
//   }>
// > => {
//   const res = await axios.get(API_ENDPOINT.PROJECT.MY_PROJ + `/${org_id}`, {
//     params: {
//       ...pagination,
//     },
//   });
//   return res.data;
// };

const fetchProjects = async ({ pageParam = 1, org_id, page_size, name }: ProjectParam) => {
  const res = await axios.get<
    ResponseSuccess<{
      projects: ProjectData[];
      total: number;
    }>
  >(API_ENDPOINT.PROJECT.MY_PROJ + `/${org_id}`, {
    params: {
      page: pageParam,
      page_size,
      name,
    },
  });

  return { ...res.data.data, page: pageParam };
};

// hooks

export const useJoinWorkspace = () =>
  useMutation({
    mutationFn: joinWorkspace,
  });

export const useInviteMember = () =>
  useMutation({
    mutationFn: addMember,
  });

export const useInfiniteProjects = (org_id: string | undefined, name?: string) =>
  useInfiniteQuery({
    queryKey: [org_id, QUERY_KEY.GET_PRJS],
    queryFn: ({ pageParam = 1 }) =>
      fetchProjects({ pageParam, org_id: org_id!, page_size: PAGE_SIZE, name }),
    enabled: Boolean(org_id),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * PAGE_SIZE;
      const total = lastPage.total;
      if (loaded >= total) return undefined;
      return lastPage.page + 1;
    },
    select: (data) => {
      const projects = data?.pages.flatMap((page) => page.projects) ?? [];
      return projects.filter((item) => Boolean(item));
    },
  });

export const useGetListWorkspaceInfinite = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_WORKSPACES],
    queryFn: ({ pageParam = 1 }) => getInfiniteWorkspace(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * PAGE_SIZE;
      const total = lastPage.total;
      if (loaded >= total) return undefined;
      return lastPage.page + 1;
    },
    select: (data) => {
      const workspaces = data?.pages.flatMap((page) => page.organizations) ?? [];
      return workspaces.filter((item) => Boolean(item));
    },
  });
};
