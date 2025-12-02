import { usePathname } from 'next/navigation';

const useMergeRouter = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  /**
   * Merge or replace a segment in the current path.
   *
   * @param link - New segment to merge
   * @param position - Index to replace (default: 1)
   * @returns string - New merged path
   */
  const merge = (link: string, position: number = 1) => {
    const newSegments = [...segments];

    if (position >= 0 && position < newSegments.length) {
      newSegments[position] = link; // replace existing segment
    } else {
      newSegments.push(link); // append if out of range
    }

    return '/' + newSegments.join('/');
  };

  return merge;
};

export default useMergeRouter;
