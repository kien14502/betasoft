import { toast } from 'sonner';

export const showToast = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning' = 'success',
) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  toast[type](capitalizedType, {
    description: message,
  });
};
