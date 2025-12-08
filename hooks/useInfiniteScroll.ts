import { useCallback, useEffect, useRef } from 'react';

type UseInfiniteScrollOptions = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

const getScrollParent = (element: HTMLElement | null): Element | null => {
  if (!element) return null;

  let parent = element.parentElement;

  if (typeof window === 'undefined') {
    return null;
  }

  while (parent && parent !== document.body) {
    const style = window.getComputedStyle(parent);
    const overflowY = style.overflowY;

    if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
      return parent;
    }

    parent = parent.parentElement;
  }

  return null;
};

/**
 * IntersectionObserver-based infinite scroll hook.
 *
 * Usage:
 * const { targetRef } = useInfiniteScroll({
 *   hasMore,
 *   loading: isFetching,
 *   onLoadMore: fetchNextPage,
 * });
 *
 * <div ref={targetRef} />
 */
export const useInfiniteScroll = (options: UseInfiniteScrollOptions) => {
  const { hasMore, loading, onLoadMore, root, rootMargin = '0px', threshold = 0.1 } = options;
  const observerRef = useRef<IntersectionObserver | null>(null);

  const targetRef = useCallback(
    (node: HTMLElement | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if (!node) return;

      if (typeof IntersectionObserver === 'undefined') {
        // Fallback: immediately trigger load when the ref attaches.
        if (hasMore && !loading) {
          onLoadMore();
        }
        return;
      }

      const scrollRoot = root ?? getScrollParent(node);

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasMore && !loading) {
            onLoadMore();
          }
        },
        {
          root: scrollRoot,
          rootMargin,
          threshold,
        },
      );

      observerRef.current.observe(node);
    },
    [hasMore, loading, onLoadMore, root, rootMargin, threshold],
  );

  useEffect(
    () => () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    },
    [],
  );

  return { targetRef };
};
