import { axios } from '@/config/axios';
import { PAGE_SIZE } from '@/constants/common';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { CreateConversationSchema } from '@/constants/schemas/conversation-schema';
import { Pagination, ResponseSuccess } from '@/interface/common';
import { FilterRoom, Room, RoomData } from '@/interface/conversation';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getRooms = async (
  payload: Pagination,
  filter: FilterRoom,
): Promise<ResponseSuccess<Room[]>> => {
  const res = await axios.get(API_ENDPOINT.ROOM.GET_ROOMS, {
    params: { ...payload, ...filter },
  });
  return res.data;
};

export const createConversation = async (
  payload: CreateConversationSchema,
): Promise<ResponseSuccess<Room>> => {
  const res = await axios.post(API_ENDPOINT.ROOM.GET_ROOMS, payload);
  return res.data;
};

export const getRoom = async (
  id: string,
  pagin: Pagination,
): Promise<ResponseSuccess<RoomData>> => {
  const res = await axios.get(API_ENDPOINT.ROOM.GET_ROOM(id), {
    params: pagin,
  });
  return res.data;
};

export const getInfiniteRoom = async ({
  pageParam = 1,
  room_id,
  page_size,
}: {
  pageParam: number;
  room_id: string;
  page_size: number;
}) => {
  const res = await axios.get<ResponseSuccess<RoomData>>(API_ENDPOINT.ROOM.GET_ROOM(room_id), {
    params: {
      page: pageParam,
      page_size,
    },
  });
  return { ...res.data.data, page: pageParam };
};

// hooks

export const useGetRoom = (id: string, pagin: Pagination) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_ROOM, id, pagin],
    queryFn: () => getRoom(id, pagin),
    select: (res) => res.data,
  });

export const useGetRooms = (payload: Pagination, filter: FilterRoom) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_ROOMS, filter.type_of_room],
    queryFn: () => getRooms(payload, filter),
    select: (data) => data.data || [],
  });

export const useInfiniteGetRooms = (room_id: string | undefined) =>
  useInfiniteQuery({
    queryKey: [QUERY_KEY.GET_ROOMS, room_id],
    queryFn: ({ pageParam = 1 }) =>
      getInfiniteRoom({ pageParam, room_id: room_id!, page_size: PAGE_SIZE }),
    initialPageParam: 1,
    enabled: Boolean(room_id),
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * PAGE_SIZE;
      const total = lastPage.total;
      if (loaded >= total) return undefined;
      return lastPage.page + 1;
    },
    select: (data) => {
      const room = data.pages[0].room;
      const message = data?.pages.flatMap((page) => page.message).reverse() ?? [];
      return { room, message: message || [] };
    },
  });

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createConversation,
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.GET_ROOMS, data.type_of_room] });
    },
  });
};
