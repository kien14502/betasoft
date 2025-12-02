export interface User {
  id: string;
  full_name: string;
  phone_number: string;
  email: string;
  email_verified: string;
  role: string;
  gender: number;
  date_of_birth: string;
  address: string;
  profile_image: string;
  colour: string;
  meta_data: MetaData;
  created_at: string;
  updated_at: string;
}

export interface MetaData {
  organization: Organization;
}

export interface Organization {
  id: string;
  name: string;
  avatar: string;
  description: string;
  industry: string;
  size: number;
  region: string;
  admin_count: number;
  member_count: number;
  sub_admin_count: number;
  created_at: string;
  updated_at: string;
}
