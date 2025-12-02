import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { JoinWorkspaceSchema } from '@/constants/schemas/workspace-schema';
import { User } from '@/interface/auth';
import { ResponseSuccess } from '@/interface/common';
import { Organization } from '@/interface/workspace';
import { useMutation } from '@tanstack/react-query';
import { GenericAbortSignal } from 'axios';

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

export const joinWorkspace = async (payload: JoinWorkspaceSchema) => {
  const res = await axios.post(API_ENDPOINT.WORKSPACE.JOIN, payload);
  return res.data;
};

export const getWorkspace = async (
  id: string,
  signal?: GenericAbortSignal,
): Promise<ResponseSuccess<Organization>> => {
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
