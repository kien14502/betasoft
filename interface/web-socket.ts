import { ESocketAction } from '@/constants';
import { ChatMessage } from './conversation';

export interface WebSocketRes<T> {
  action: ESocketAction;
  data: T;
}

export type WebSocketMessage = WebSocketRes<ChatMessage>;
