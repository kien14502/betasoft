'use client';

import { useRef, useEffect, useCallback, useState, type RefObject } from 'react';

interface UseLoadMoreOnScrollOptions {
  /** Callback to load more items */
  onLoadMore: () => void;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Distance from top in pixels to trigger load (default: 50) */
  threshold?: number;
}

interface UseLoadMoreOnScrollReturn<T extends HTMLElement> {
  /** Ref to attach to the scrollable container */
  containerRef: RefObject<T | null>;
  /** Whether currently loading more items */
  isLoading: boolean;
  /** Whether scroll position is near the top */
  isNearTop: boolean;
}

export function useConversationLoadMore<T extends HTMLElement = HTMLDivElement>({
  onLoadMore,
  hasMore,
  threshold = 50,
}: UseLoadMoreOnScrollOptions): UseLoadMoreOnScrollReturn<T> {
  const containerRef = useRef<T>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false);
  const previousScrollHeightRef = useRef<number>(0);
  const isLoadingRef = useRef(false);

  // Maintain scroll position after loading more items
  useEffect(() => {
    if (containerRef.current && previousScrollHeightRef.current > 0) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - previousScrollHeightRef.current;
      containerRef.current.scrollTop = scrollDiff;
      previousScrollHeightRef.current = 0;
    }
  });

  const handleScroll = useCallback(async () => {
    const container = containerRef.current;
    if (!container || isLoadingRef.current || !hasMore) return;

    const isAtTop = container.scrollTop <= threshold;
    setIsNearTop(isAtTop);

    if (isAtTop) {
      isLoadingRef.current = true;
      setIsLoading(true);
      previousScrollHeightRef.current = container.scrollHeight;

      try {
        await onLoadMore();
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    }
  }, [onLoadMore, hasMore, threshold]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return {
    containerRef,
    isLoading,
    isNearTop,
  };
}
