import { ESocketAction } from '@/constants';

export interface WebSocketRes<T> {
  action: ESocketAction;
  data: T;
}
export interface MessageData {
  id: string;
  content: string;
  type_content: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  user: User;
}

interface User {
  id: string;
  full_name: string;
  email: string;
  profile_image: string;
  colour: string;
}
export type WebSocketMessage = WebSocketRes<MessageData>;
