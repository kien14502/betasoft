export interface Organization {
  organization: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    industry: string;
    size: number;
    region: string;
    created_at: string;
    updated_at: string;
  };
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
