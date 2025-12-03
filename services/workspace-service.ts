import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { JoinWorkspaceSchema } from '@/constants/schemas/workspace-schema';
import { User } from '@/interface/auth';
import { ResponseSuccess } from '@/interface/common';
import { DetailWorkspace, Organization } from '@/interface/workspace';
import { useMutation } from '@tanstack/react-query';
import { GenericAbortSignal } from 'axios';

export const getListWorkspace = async (): Promise<
  ResponseSuccess<{ organizations: Organization[]; total: number }>
> => {
  const res = await axios.get(`/auth/organizations`, {
    params: {
      page: 1,
      page_size: 10,
    },
  });
  return res.data;
};

export const launchWorkspace = async (org_id: string) => {
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

export const getMembersWorkspace = async (
  id: string,
  signal?: GenericAbortSignal,
): Promise<ResponseSuccess<User[]>> => {
  const res = await axios.get(API_ENDPOINT.WORKSPACE[''] + `/${id}`, {
    signal,
  });
  return res.data;
};

// hooks

export const useJoinWorkspace = () =>
  useMutation({
    mutationFn: joinWorkspace,
  });
