import { axios } from '@/config/axios';
import { API_ENDPOINT } from '@/constants/endpoint';
import { QUERY_KEY } from '@/constants/query-key';
import {
  CreateProjectTaskSchemaType,
  TaskSectionSchema,
  UpdateTaskSchema,
} from '@/constants/schemas/workspace-schema';
import { ResponseSuccess } from '@/interface/common';
import { Task, TaskMove, TaskSection } from '@/interface/task';
import { showToast } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const getTask = async (
  org_id: string,
): Promise<ResponseSuccess<{ total: number; tasks: Task[] }>> => {
  const res = await axios.get(API_ENDPOINT.TASK.TASK(org_id));
  return res.data;
};

export const getTaskSection = async (prj_id: string): Promise<ResponseSuccess<TaskSection[]>> => {
  const res = await axios.get(API_ENDPOINT.TASK.SECTION[''] + `/${prj_id}`);
  return res.data;
};

export const createTaskSection = async (
  payload: TaskSectionSchema,
): Promise<ResponseSuccess<TaskSection>> => {
  const res = await axios.post(API_ENDPOINT.TASK.SECTION[''], payload);
  return res.data;
};

export const deleteTaskSection = async () => {
  const res = await axios.get(API_ENDPOINT.TASK.SECTION['']);
  return res.data;
};

export const getKanban = async (org_id: string) => {
  const res = await axios.get(API_ENDPOINT.TASK.KANBAN(org_id));
  return res.data;
};

export const moveTaskKanban = async (payload: TaskMove) => {
  const res = await axios.put(API_ENDPOINT.TASK.MOVE_TASK, payload);
  return res.data;
};

export const updateTask = async (payload: UpdateTaskSchema): Promise<ResponseSuccess<Task>> => {
  const res = await axios.patch(API_ENDPOINT.TASK[''], payload);
  return res.data;
};

export const deleteTask = async (task_id: string) => {
  const res = await axios.delete(API_ENDPOINT.TASK[''] + `${task_id}`);
  return res.data;
};

export const createTask = async (payload: CreateProjectTaskSchemaType) => {
  const res = await axios.post(API_ENDPOINT.TASK[''], payload);
  return res.data;
};
// hooks

export const useGetTask = (org_id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_TASKS, org_id],
    queryFn: () => getTask(org_id),
    select: ({ data }) => data,
    enabled: !!org_id,
  });

export const useCreateTask = (callback?: (data: Task) => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,

    onSuccess: ({ data, message }) => {
      showToast(message, 'success');
      callback?.(data);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASKS, data.project_id],
      });
    },
  });
};

export const useGetTaskKanban = (org_id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_TASKS, org_id],
    queryFn: () => getKanban(org_id),
    select: ({ data, message }) => {
      showToast(message, 'success');
      return data;
    },
    enabled: !!org_id,
  });

export const useUpdateTask = (callback?: (task: Task) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTask,
    onSuccess: ({ data }) => {
      callback?.(data);
      const key = [QUERY_KEY.GET_TASKS];
      queryClient.invalidateQueries({ queryKey: key });
    },
  });
};

export const useDeleteTask = () =>
  useMutation({
    mutationFn: deleteTask,
  });

export const useMoveTaskKanban = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: moveTaskKanban,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_TASKS],
      });
    },
  });
};

export const useCreateTaskSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTaskSection,
    onMutate: async (variables: TaskSectionSchema) => {
      const key = [QUERY_KEY.GET_SECTIONS, variables.project_id];

      await queryClient.cancelQueries({ queryKey: key });

      const prev = queryClient.getQueryData<ResponseSuccess<TaskSection[]>>(key);

      queryClient.setQueryData(key, (old: ResponseSuccess<TaskSection[]>) => {
        if (!old) return old;

        return {
          ...old,
          data: [
            ...old.data,
            {
              ...variables,
              id: 'temp-id',
              tasks: [],
            },
          ],
        };
      });

      return { prev };
    },
    onError: (_error, variables, context) => {
      if (context?.prev) {
        queryClient.setQueryData([QUERY_KEY.GET_SECTIONS, variables.project_id], context.prev);
      }
    },
    onSettled: (_, __, variables: TaskSectionSchema) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_SECTIONS, variables.project_id],
      });
    },
  });
};

export const useGetTaskSections = (prj_id: string) =>
  useQuery({
    queryKey: [QUERY_KEY.GET_SECTIONS, prj_id],
    queryFn: () => getTaskSection(prj_id),
    select: ({ data }) => data,
    enabled: !!prj_id,
  });
