import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import ButtonWrapper from '../components/ButtonWrapper';
import LaunchApp from '../components/LaunchApps';

const WorkspacePage = () => (
  <div className="rounded-[64px] bg-[#FFFFFF1A] flex items-center gap-16 justify-center flex-col p-16 pt-12 backdrop-blur-xl">
    <p className="text-[40px] font-medium text-white">Already have a Workspace?</p>
    <div className="grid grid-cols-3 gap-6">
      <ButtonWrapper
        content={
          <>
            <Image
              src={'/images/create-ws.png'}
              width={178}
              height={164}
              alt="Icon for creating a new workspace"
            />
            <div className="flex text-lg gap-10 font-semibold items-center justify-between">
              Create Workspace
              <Button
                className="w-13 bg-blue-4 rounded-full border-2 border-blue-2 shadow-secondary"
                size={'sm'}
              >
                <Plus />
              </Button>
            </div>
          </>
        }
        href="/workspace/create-workspace"
      />
      <ButtonWrapper
        content={
          <>
            <Image src={'/images/join-ws.png'} width={178} height={164} alt="" />{' '}
            <div className="flex text-lg gap-10 font-semibold items-center justify-between">
              Join Organization
              <Button
                className="w-13 shadow-secondary rounded-full border border-blue-3"
                size={'sm'}
                variant={'outline'}
              >
                <Image src={'/icons/arrow-right-2.svg'} alt="" width={20} height={20} />
              </Button>
            </div>
          </>
        }
        href="/workspace/join-workspace"
      />
      <ButtonWrapper
        content={
          <>
            <Image src={'/images/join-chat.png'} width={178} height={164} alt="" />
            <div className="flex text-lg font-semibold gap-10 items-center justify-between">
              Chat With Friend
              <Button
                className="w-13 shadow-secondary rounded-full border border-blue-3"
                size={'sm'}
                variant={'outline'}
              >
                <Image src={'/icons/arrow-right-2.svg'} alt="" width={20} height={20} />
              </Button>
            </div>
          </>
        }
        href="/channels/global"
      />
    </div>
    <LaunchApp />
  </div>
);
export default WorkspacePage;
