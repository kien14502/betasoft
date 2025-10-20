import { usePathname } from 'next/navigation';

const useGetIdWorkspace = () => {
  const pathname = usePathname();

  return {
    idWs: pathname.split('/')[1],
  };
};
export default useGetIdWorkspace;
