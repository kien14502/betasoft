import z from 'zod';
import { emailRegex } from '../regex';

export const createWorkspaceSchema = z.object({
  name: z.string().min(3, 'Workspace name must be at least 3 characters'),
  size: z.string().min(1, 'Workspace size must be at least 1'),
});
export type CreateWorkSpaceSchemaType = z.infer<typeof createWorkspaceSchema>;

export const newWorkSpaceSchema = z.object({
  id: z.string().optional(),
  // industry: z.string().min(3).max(100).optional(),
  avatar: z.string().url().optional(),
  name: z.string().min(3).max(100),
  size: z.number().min(1).optional(),
  region: z.string().optional(),
  description: z.string().max(500).optional(),
});
export type NewWorkSpaceSchemaType = z.infer<typeof newWorkSpaceSchema>;

export const inviteMemberSchema = z.object({
  email: z.string().regex(emailRegex, 'Invalid email address'),
  org_id: z.string(),
});
export type InviteMemberSchemaType = z.infer<typeof inviteMemberSchema>;

export const joinWorkspaceSchema = z.object({
  invite_code: z.string().length(6),
});

export type JoinWorkspaceSchema = z.infer<typeof joinWorkspaceSchema>;

export interface RequestCreateLabelDataToCreate {
  color?: string;
  description?: string;
  name: string;
  project_id: string;
}

export const createProjectSchema = z.object({
  avatar: z.string().optional(),
  description: z.string().max(500).optional(),
  is_team: z.boolean().optional(),
  labels: z.array(
    z.object({
      color: z.string().optional(),
      description: z.string().optional(),
      name: z.string(),
    }),
  ),
  lead: z.string().optional(),
  members: z.array(z.string()).optional(),
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  org_id: z.string(),
  project_type: z.string().optional(),
  settings: z
    .object({
      allow_guests: z.boolean().optional(),
      enable_due_dates: z.boolean().optional(),
      enable_notifications: z.boolean().optional(),
      enable_time_tracking: z.boolean().optional(),
    })
    .optional(),
  sprints: z.array(
    z.object({
      begin_at: z.string(),
      end_at: z.string(),
      name: z.string(),
      is_active: z.boolean(),
      goal: z.string(),
    }),
  ),
  task_list: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      position: z.number().optional(),
      is_default: z.boolean().optional(),
      color: z.string().optional(),
    }),
  ),
  template_id: z.string().optional(),
});
export type CreateProjectSchemaType = z.infer<typeof createProjectSchema>;

export const createProjectTaskSchema = z.object({
  assignee: z.string().optional(),
  checkpoint: z.number().optional(),
  completed_at: z.string().optional(),
  description: z.string().optional(),
  due_date: z.string().optional(),
  due_reminder: z
    .object({
      custom_days: z.number().optional(),
      enabled: z.boolean(),
      remind_at: z.string().optional(),
    })
    .optional(),
  labels: z.array(z.string()).optional(),
  list_id: z.string(),
  parent_task_id: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  project_id: z.string(),
  sprint_id: z.string(),
  start_date: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
});

export type CreateProjectTaskSchemaType = z.infer<typeof createProjectTaskSchema>;

export const updateTaskSchema = createProjectTaskSchema.partial().extend({
  task_id: z.string().nonempty(),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;

export const taskFilterSchema = z.object({
  list_id: z.array(z.string()).optional(),
  // label: z.array(z.string()).optional(),
  priority: z.array(z.string()).optional(),
  assignee: z.array(z.string()).optional(),
  due_date: z.string().optional(),
  // created_by: z.string().optional(),
  reporter: z.string().optional(),
  title: z.string().optional(),
  label: z.array(z.string()).optional(),
  start_date: z.string().optional(),
});

export type TaskFilterSchema = z.infer<typeof taskFilterSchema>;

export const taskSectionSchema = z.object({
  color: z.string(),
  description: z.string().optional(),
  name: z.string().min(4),
  position: z.number(),
  project_id: z.string(),
});

export type TaskSectionSchema = z.infer<typeof taskSectionSchema>;
