import { ChatMessage, Member } from '@/interface/conversation';
import dayjs from 'dayjs';

export interface GroupedMessage {
  userId: string;
  user: Member;
  messages: Array<{
    id: string;
    content: string;
    created_at: string;
  }>;
  firstMessageTime: string;
}

export const groupMessagesByUserWithTime = (
  messages: ChatMessage[],
  timeThresholdMinutes: number = 5,
): GroupedMessage[] => {
  const grouped: GroupedMessage[] = [];
  let currentGroup: GroupedMessage | null = null;

  if (!messages || messages.length === 0) return [];

  messages.forEach((msg) => {
    if (!msg) return;
    const shouldCreateNewGroup =
      !currentGroup ||
      currentGroup.userId !== msg.user.id ||
      dayjs(msg.created_at).diff(
        dayjs(currentGroup.messages[currentGroup.messages.length - 1].created_at),
        'minute',
      ) > timeThresholdMinutes;

    if (shouldCreateNewGroup) {
      currentGroup = {
        userId: msg.user.id,
        user: msg.user,
        messages: [
          {
            id: msg.id,
            content: msg.content,
            created_at: msg.created_at,
          },
        ],
        firstMessageTime: msg.created_at,
      };
      grouped.push(currentGroup);
    } else {
      currentGroup!.messages.push({
        id: msg.id,
        content: msg.content,
        created_at: msg.created_at,
      });
    }
  });

  return grouped;
};
