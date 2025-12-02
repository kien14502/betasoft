import { axios } from '@/config/axios';
import {
  CreateTaskComment,
  DeleteTaskComment,
  GetTaskCommentsParams,
} from '@/constants/schemas/task-comment-schema';
import { useMutation, useQuery } from '@tanstack/react-query';

export const getAllTaskComments = async (payload: GetTaskCommentsParams) => {
  const res = await axios.get(`/auth/tasks/comments`, { params: payload });
  return res.data;
};

export const createTaskComment = async (payload: CreateTaskComment) => {
  const res = await axios.post(`/auth/tasks/comments`, payload);
  return res.data;
};

export const deleteTaskComment = async (payload: DeleteTaskComment) => {
  const res = await axios.delete(`/auth/tasks/comments`, { data: payload });
  return res.data;
};

export const useGetTaskComments = (params: GetTaskCommentsParams) => {
  return useQuery({
    queryKey: ['task-comments', params],
    queryFn: () => getAllTaskComments(params),
    enabled: !!params.taskID,
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
