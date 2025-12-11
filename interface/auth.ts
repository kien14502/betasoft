import { DetailWorkspace } from './workspace';

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
  organization: DetailWorkspace;
}

export interface RequestRegisterRequest {
  email: string;
  full_name?: string;
  password?: string;
  /**
   * @minimum 1
   * @maximum 3
   */
  step: number;
  verify_code?: string;
}
