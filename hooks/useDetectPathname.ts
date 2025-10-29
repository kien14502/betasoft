import { usePathname } from 'next/navigation';

const useDetectPathname = (index: number) => {
  const pahtname = usePathname();
  const arr = pahtname.split('/');

  return arr[index];
};
export default useDetectPathname;
