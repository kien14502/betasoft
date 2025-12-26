import { axios } from '@/config/axios';
import { PAGE_SIZE } from '@/constants/common';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import {
  CreateTaskComment,
  DeleteTaskComment,
  GetTaskCommentsParams,
} from '@/constants/schemas/task-comment-schema';
import { ResponseSuccess } from '@/interface/common';
import { Comment } from '@/interface/task';
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const getAllTaskComments = async (payload: GetTaskCommentsParams) => {
  const { projectId, ...rest } = payload;
  const res = await axios.get<ResponseSuccess<{ comments: Comment[]; total: number }>>(
    API_ENDPOINT.TASK.COMMENT.GET(projectId),
    { params: rest },
  );
  return { ...res.data.data, page: rest.page };
};

export const createTaskComment = async (
  payload: CreateTaskComment,
): Promise<ResponseSuccess<Comment>> => {
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

export const useDeleteTaskComment = () => {
  return useMutation({
    mutationFn: (payload: DeleteTaskComment) => deleteTaskComment(payload),
    // mutationKey: [QUERY_KEY.TASK_COMMENT, 'task_id', 'projectId'],
  });
};

export const useCreateTaskComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEY.TASK_COMMENT, 'create'],
    mutationFn: (payload: CreateTaskComment) => createTaskComment(payload),
    onSuccess: ({ data }, variables) => {
      const listKey = [QUERY_KEY.TASK_COMMENT, variables.task_id, variables.project_id];

      // Update infinite query data structure
      queryClient.setQueryData<
        InfiniteData<{
          comments: Comment[];
          total: number;
          page: number;
        }>
      >(listKey, (old) => {
        if (!old) {
          return {
            pages: [
              {
                comments: [data],
                total: 1,
                page: 1,
              },
            ],
            pageParams: [1],
          };
        }

        const newPages = [...old.pages];
        newPages[0] = {
          ...newPages[0],
          comments: [...newPages[0].comments, data],
          total: newPages[0].total + 1,
        };
        return {
          ...old,
          pages: newPages,
        };
      });
    },
  });
};

export const useInfiniteGetComments = (task_id: string, projectId: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.TASK_COMMENT, task_id, projectId],
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
      const comments = data?.pages.flatMap((page) => page.comments).reverse() ?? [];
      return comments.filter((item) => Boolean(item));
    },
    enabled: !!task_id && !!projectId,
  });
};
