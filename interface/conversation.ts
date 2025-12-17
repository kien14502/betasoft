import { ROOMS_TYPE } from '@/constants/common';

/**
 * Interface cho cấu trúc tin nhắn gần nhất (latest_messages)
 */
export interface LatestMessage {
  id: string;
  user_id: string;
  content: string; // Có vẻ như là base64 encoded string ("YQ==")
  type_content: number;
  image_url: string;
  room_id: string;
  created_at: string; // ISO 8601 Date String
  updated_at: string; // ISO 8601 Date String
}

export interface ChatMessage {
  id: string;
  content: string; // Chuỗi Base64 encoded (ví dụ: "aGVsbG8=")
  type_content: number;
  image_url: string; // Trong mẫu này là chuỗi rỗng
  created_at: string; // ISO 8601 Date String
  updated_at: string; // ISO 8601 Date String
  user: Member;
}

/**
 * Interface cho cấu trúc thành viên (members)
 */
export interface Member {
  id: string; // Trong mẫu này là chuỗi rỗng
  full_name: string; // Trong mẫu này là chuỗi rỗng
  email: string;
  profile_image: string; // Trong mẫu này là chuỗi rỗng
  colour: string; // ISO 8601 Date String
}

/**
 * Interface chính cho cấu trúc Room (Phòng/Cuộc trò chuyện)
 */
export interface Room {
  id: string;
  name: string;
  members: Member[];
  type_of_room: number;
  organization_id: string;
  is_cross_organization: boolean;
  latest_messages: LatestMessage;
  created_at: string; // ISO 8601 Date String
  updated_at: string; // ISO 8601 Date String
  has_notification: boolean;
}

export interface RoomData {
  room: Room;
  message: ChatMessage[];
  total: number; // Danh sách các tin nhắn đã gửi/nhận
}

export interface CreateRoom {
  type_of_room: number;
  name: string;
  members: string[];
  organization_id?: string;
}

export interface FilterRoom {
  is_cross_organization: boolean;
  type_of_room: number;
}
