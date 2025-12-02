import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import { Pagination, ResponseSuccess } from '@/interface/common';
import { Room, RoomData } from '@/interface/conversation';
import { useQuery } from '@tanstack/react-query';

export const getRooms = async (payload: Pagination): Promise<ResponseSuccess<Room[]>> => {
  const res = await axios.get(API_ENDPOINT.ROOM.GET_ROOMS, {
    params: payload,
  });
  return res.data;
};

export const useGetRooms = (payload: Pagination) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ROOMS, payload],
    queryFn: () => getRooms(payload),
    select: (data) => data.data || [],
  });
};

export const getRoom = async (
  id: string,
  pagin: Pagination,
): Promise<ResponseSuccess<RoomData[]>> => {
  const res = await axios.get(API_ENDPOINT.ROOM.GET_ROOM(id), {
    params: pagin,
  });
  return res.data;
};

export const useGetRoom = (id: string, pagin: Pagination) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_ROOM, id, pagin],
    queryFn: () => getRoom(id, pagin),
    select: (res) => res.data,
  });
};
