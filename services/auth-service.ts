import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { User } from '@/interface/auth';
import { ResponseSuccess } from '@/interface/common';

const getMe = async (): Promise<ResponseSuccess<User>> => {
  const res = await axios.get(API_ENDPOINT.AUTH.PROFILE);
  return res.data;
};

export const authService = {
  getMe,
};
