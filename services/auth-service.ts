import { axios } from '@/config/axios';
import { PAGE_SIZE } from '@/constants/common';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { RequestRegisterRequest, User } from '@/interface/auth';
import { ResponseSuccess } from '@/interface/common';
import { useInfiniteQuery, useMutation } from '@tanstack/react-query';

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

export const searchUser = async (pageParam: number = 1, email: string) => {
  const res = await axios.get<
    ResponseSuccess<{
      total: number;
      users: User[];
    }>
  >(API_ENDPOINT.AUTH.SEARCH_USER, {
    params: { email, page: pageParam, page_size: PAGE_SIZE },
  });
  return { ...res.data.data, page: pageParam };
};

export const authService = {
  getMe,
  register,
  searchUser,
};

// hooks

export const useAuthRegister = () =>
  useMutation({
    mutationFn: register,
    mutationKey: [QUERY_KEY.AUTH],
  });

export const useSearchUserInfinite = (email: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.USER, email],
    queryFn: ({ pageParam = 1 }) => searchUser(pageParam, email),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * PAGE_SIZE;
      const total = lastPage.total;
      if (loaded >= total) return undefined;
      return lastPage.page + 1;
    },
    enabled: !!email,
    select: ({ pages }) => {
      const workspaces = pages.flatMap((page) => page.users) ?? [];
      return workspaces.filter((item) => Boolean(item));
    },
  });
};
