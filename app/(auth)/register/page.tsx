import Image from 'next/image';
import { Button } from '@/components/ui/button';
import CreateAccount from '../components/CreateAccount';
import Link from 'next/link';

function Page() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-[40px] font-medium">Sign Up Free</p>
        <span className="text-xs text-gray-4">
          Join us today to unlock exclusive features that will boost your team&apos;s productivity!
        </span>
      </div>
      <Button className="border-[#5096F1] h-[52px] rounded-xl" variant={'outline'}>
        <Image width={28} height={28} src={'icons/google.svg'} alt="" />
        Continue with Google
      </Button>
      <div className="text-center text-sm">Or continue with</div>
      <CreateAccount />
      <div className="flex items-center gap-1 justify-center text-sm">
        <span>Already have an account?</span>
        <Link href={'/login'} className="text-blue-4!">
          Login
        </Link>
      </div>
    </>
  );
}

export default Page;
