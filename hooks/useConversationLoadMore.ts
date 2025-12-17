'use client';

import { useRef, useEffect, useCallback, type RefObject } from 'react';

// Use the existing interface definitions
interface UseLoadMoreOnScrollOptions {
  /** Callback to load more items */
  onLoadMore: () => void;
  /** Whether there are more items to load */
  hasMore: boolean;
  /** Distance from top in pixels to trigger load (default: 50) */
  threshold?: number;
  /** Whether data is currently being fetched */
  isFetching?: boolean;
}

interface UseLoadMoreOnScrollReturn<T extends HTMLElement> {
  /** Ref to attach to the scrollable container */
  containerRef: RefObject<T | null>;
}

export function useConversationLoadMore<T extends HTMLElement = HTMLDivElement>({
  onLoadMore,
  hasMore,
  threshold = 50,
  isFetching = false,
}: UseLoadMoreOnScrollOptions): UseLoadMoreOnScrollReturn<T> {
  const containerRef = useRef<T>(null);

  // Ref to store the scroll height *before* loading new items
  const prevScrollHeightRef = useRef<number>(0);
  // Ref to store the last scroll position *before* loading new items
  const prevScrollTopRef = useRef<number>(0);

  // 1. Core scroll handler to trigger load more
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isFetching || !hasMore) {
      return;
    }

    const scrollTop = container.scrollTop;

    // Check if near the top
    if (scrollTop < threshold) {
      // Store the current scroll height and position *before* calling onLoadMore
      // which will trigger a fetch and content insertion.
      prevScrollHeightRef.current = container.scrollHeight;
      prevScrollTopRef.current = scrollTop;

      onLoadMore();
    }
  }, [onLoadMore, hasMore, threshold, isFetching]); // Dependencies are crucial for useCallback

  // 2. Attach and detach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // We use a reference to handleScroll that is stable due to useCallback.
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 3. Effect to restore scroll position AFTER new items have loaded
  useEffect(() => {
    const container = containerRef.current;

    // Condition: Data just finished fetching AND new content was added
    // (i.e., prevScrollHeightRef has a value from the handleScroll call)
    if (!isFetching && container && prevScrollHeightRef.current > 0) {
      const newScrollHeight = container.scrollHeight;
      const heightDifference = newScrollHeight - prevScrollHeightRef.current;

      // Calculate the new scroll top position
      // The new position is the difference in height + the old position.
      // We also add the old scrollTop position (prevScrollTopRef.current)
      // in case the user scrolled a tiny bit before the fetch was triggered.
      const newScrollTop = heightDifference + prevScrollTopRef.current;

      container.scrollTop = newScrollTop;

      // Reset the tracking refs
      prevScrollHeightRef.current = 0;
      prevScrollTopRef.current = 0;
    }
  }, [isFetching]); // This runs whenever isFetching changes

  return {
    containerRef,
  };
}
