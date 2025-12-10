import { User } from './auth';

// Định nghĩa cho Project Settings (object lồng trong Project)
export interface ProjectSettings {
  allow_guests: boolean;
  enable_due_dates: boolean;
  enable_notifications: boolean;
  enable_time_tracking: boolean;
}

// Định nghĩa cho Project (Dự án)
export interface Project {
  avatar: string;
  created_at: string;
  created_by: string;
  description: string;
  id: string;
  is_team: boolean;
  lead: string;
  name: string;
  organization_id: string;
  project_type: string;
  settings: ProjectSettings;
  status: string;
  template_id: string;
  updated_at: string;
}

// Định nghĩa cho Lead (Người quản lý/Dẫn dắt)
export interface Lead {
  colour: string;
  email: string;
  full_name: string;
  id: string;
  profile_image: string;
}

// Định nghĩa cho Label (Nhãn)
export interface Label {
  color: string;
  description: string;
  id: string;
  name: string;
}

// Định nghĩa cho Column (Cột/Trạng thái trong bảng Kanban/Scrum)
export interface Column {
  color: string;
  id: string;
  name: string;
  position: number;
}

// Định nghĩa cho Sprint Active (Sprint đang hoạt động)
export interface SprintActive {
  begin_at: string;
  end_at: string;
  id: string;
  is_active: boolean;
  name: string;
  project_id: string;
}

// export Interface chính bao trọn toàn bộ cấu trúc
export interface ProjectDetails {
  columns: Column[];
  labels: Label[];
  lead: Lead;
  project: Project;
  sprint_active: SprintActive;
}

export interface MemberProject {
  member: User;
  role: string;
}
