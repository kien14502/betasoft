import { z } from 'zod';

// Schema cho query parameters
export const getTaskCommentsSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  page_size: z.number().int().positive().optional().default(10),
  parentID: z.string().optional(),
  taskID: z.string(), // required
});

// Type inference
export type GetTaskCommentsParams = z.infer<typeof getTaskCommentsSchema>;

// Schema cho create/update comment
export const createTaskCommentSchema = z.object({
  content: z.string().min(1, 'Content không được để trống'),
  mentions: z.array(z.string()).default([]),
  parent_id: z.string().optional(),
  project_id: z.string().min(1, 'Project ID là bắt buộc'),
  task_id: z.string().min(1, 'Task ID là bắt buộc'),
});

// Type inference
export type CreateTaskComment = z.infer<typeof createTaskCommentSchema>;

export const deleteTaskCommentSchema = z.object({
  comment_id: z.string().min(1, 'Comment ID là bắt buộc'),
  project_id: z.string().min(1, 'Project ID là bắt buộc'),
  task_id: z.string().min(1, 'Task ID là bắt buộc'),
});
// Type inference
export type DeleteTaskComment = z.infer<typeof deleteTaskCommentSchema>;

export const messageSchema = z.object({
  content: z.string().min(1, 'Content không được để trống'),
  images: z.array(z.string()).optional(),
  file: z.string().optional(),
});

export type Message = z.infer<typeof messageSchema>;
