import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { RequestRegisterRequest, User } from '@/interface/auth';
import { ResponseSuccess } from '@/interface/common';
import { useMutation } from '@tanstack/react-query';

const getMe = async (): Promise<ResponseSuccess<User>> => {
  const res = await axios.get(API_ENDPOINT.AUTH.PROFILE);
  return res.data;
};

const register = async (
  payload: RequestRegisterRequest,
): Promise<
  ResponseSuccess<{
    user: User;
    token: string;
  }>
> => {
  const res = await axios.post(API_ENDPOINT.AUTH.REGISTER, payload);
  return res.data;
};

export const authService = {
  getMe,
  register,
};

// hooks

export const useAuthRegister = () =>
  useMutation({
    mutationFn: register,
    mutationKey: [QUERY_KEY.AUTH],
  });
