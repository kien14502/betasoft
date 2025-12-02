import { Button } from '@/components/ui/button';
import Image from 'next/image';

const GoogleButton = () => {
  return (
    <Button size={'xl'} variant={'outline'}>
      <Image width={32} height={32} src={'/icons/google.svg'} alt="" />
      Continue with Google
    </Button>
  );
};
export default GoogleButton;
