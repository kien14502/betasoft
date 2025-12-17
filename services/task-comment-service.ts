import { axios } from '@/config/axios';
import { PAGE_SIZE } from '@/constants/common';
import { API_ENDPOINT } from '@/constants/endpoint';
import {
  CreateTaskComment,
  DeleteTaskComment,
  GetTaskCommentsParams,
} from '@/constants/schemas/task-comment-schema';
import { ResponseSuccess } from '@/interface/common';
import { Comment } from '@/interface/task';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

export const getAllTaskComments = async (payload: GetTaskCommentsParams) => {
  const { projectId, ...rest } = payload;
  const res = await axios.get<ResponseSuccess<{ comment: Comment[]; total: number }>>(
    API_ENDPOINT.TASK.COMMENT.GET(projectId),
    { params: rest },
  );
  return { ...res.data.data, page: rest.page };
};

export const createTaskComment = async (payload: CreateTaskComment) => {
  const res = await axios.post(API_ENDPOINT.TASK.COMMENT.CREATE, payload);
  return res.data;
};

export const deleteTaskComment = async (payload: DeleteTaskComment) => {
  const res = await axios.delete(API_ENDPOINT.TASK.COMMENT.DELETE, { data: payload });
  return res.data;
};

export const useGetTaskComments = (params: GetTaskCommentsParams) => {
  return useQuery({
    queryKey: ['task-comments', params],
    queryFn: () => getAllTaskComments(params),
    enabled: !!params.task_id,
  });
};

export const useCreateTaskComment = () => {
  return useMutation({
    mutationFn: (payload: CreateTaskComment) => createTaskComment(payload),
  });
};

export const useDeleteTaskComment = () => {
  return useMutation({
    mutationFn: (payload: DeleteTaskComment) => deleteTaskComment(payload),
  });
};

export const useInfiniteGetComments = (task_id: string, projectId: string) => {
  return useInfiniteQuery({
    queryKey: ['task-comments'],
    queryFn: ({ pageParam }) =>
      getAllTaskComments({
        page: pageParam,
        page_size: PAGE_SIZE,
        task_id: task_id,
        projectId: projectId,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * PAGE_SIZE;
      const total = lastPage.total;
      if (loaded >= total) return undefined;
      return lastPage.page + 1;
    },
    select: (data) => {
      const projects = data?.pages.flatMap((page) => page.comment) ?? [];
      return projects.filter((item) => Boolean(item));
    },
    enabled: !!task_id && !!projectId,
  });
};
