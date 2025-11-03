import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export const timeAgo = (date?: string) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

export const fDate = (date?: string) => {
  if (!date) return undefined;
  return dayjs(date).toDate();
};
