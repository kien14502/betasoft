import { User } from './auth';
import { Member } from './conversation';

export interface ProjectLead {
  colour: string;
  email: string;
  full_name: string;
  id: string;
  profile_image: string;
}

export interface Project {
  avatar: string;
  created_at: string;
  created_by: string;
  description: string;
  id: string;
  lead: ProjectLead;
  name: string;
  organization_id: string;
  project_type: string;
  status: string;
  updated_at: string;
}

export interface Statistic {
  completed_tasks: number;
  created_at: string;
  id: string;
  overdue_tasks: number;
  project_id: string;
  total_members: number;
  total_tasks: number;
  updated_at: string;
}

export interface ProjectData {
  project: Project;
  role: 'admin' | string;
  statistic: Statistic;
}
export interface Task {
  id: string;
  project_id: string;
  list_id: string;
  title: string;
  description: string;
  position: number;
  priority: 'low' | 'medium' | 'high';
  board_position: number;
  due_reminder: {
    Key: string;
    Value: string | boolean;
  }[];
  created_at: string;
  updated_at: string;
  assignee: Member;
  reporter: Member;
  created_by: Member;
  sprint_id: string;
}

export interface TaskMove {
  project_id: string;
  task_id: string;
  sprint_id: string;
  target_list_id: string;
  target_position: number;
}
export interface TaskSection {
  id: string;
  project_id: string;
  name: string;
  description: string;
  color: string; // "^#F59E0B"
  position: number;
  is_default: boolean;
  created_by: string;
  updated_by: string;
  created_at: string; // hoặc Date nếu bạn muốn convert
  updated_at: string; // hoặc Date
}

export interface Comment {
  id: string;
  comment_task_id: string;
  author: User;
  comment_content: string; // Lexical serialized JSON string
  mentions: string[];
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}
