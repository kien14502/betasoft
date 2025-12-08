import { useRef } from 'react';

export const useScrollBottom = () => {
  const currentRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (currentRef.current) {
      currentRef.current?.scrollTo({
        left: currentRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  return {
    currentRef,
    scrollToBottom,
  };
};
