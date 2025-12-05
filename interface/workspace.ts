export interface Organization {
  organization: DetailWorkspace;
  roles: string[];
  joined_at: string;
}

export interface DetailWorkspace {
  admin_count: number;
  avatar: string;
  created_at: string;
  description: string;
  id: string;
  industry: string;
  member_count: number;
  name: string;
  region: string;
  size: number;
  sub_admin_count: number;
  updated_at: string;
}

export type ProjectParam = {
  pageParam: number;
  org_id: string;
  page_size: number;
  name?: string;
};
