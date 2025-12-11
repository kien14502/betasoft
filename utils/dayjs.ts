import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';

dayjs.extend(relativeTime);
dayjs.extend(duration);

export const timeAgo = (date?: string) => {
  if (!date) return '';
  return dayjs(date).fromNow();
};

export const fDate = (date?: string) => {
  if (!date) return undefined;
  return dayjs(date).toDate();
};

export const fHmmA = (dateString: string) => {
  const formatted = dayjs(dateString).format('h:mm A');
  return formatted;
};

export const fDateAtTime = (dateString: string) => {
  const formatted = dayjs(dateString).format('DD MMM [At] HH:mm');
  return formatted;
};

export const over5MinutesNow = (dateString: string) => {
  return dayjs().diff(dayjs(dateString), 'minute') > 5;
};

export const fTimeCounter = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};
