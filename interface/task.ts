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
