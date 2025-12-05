import { useState } from 'react';

export const useCopy = (timeout = 2000) => {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (err) {
      console.error('Copy failed:', err);
      return false;
    }
  };

  return { copied, copy };
};
