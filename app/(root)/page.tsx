'use client';
import React from 'react';
import ButtonWrapper from './components/ButtonWrapper';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useGetAuthOrganizations } from '../api/organizations/organizations';
import Link from 'next/link';

const WelcomePage: React.FC = () => {
  const { data: workspaces } = useGetAuthOrganizations(
    { page: 1, page_size: 10 },
    {
      query: { select: (data) => data.data },
    },
  );

  return (
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
          href="/create-workspace"
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
          href="/join-workspace"
        />
        <ButtonWrapper
          content={
            <>
              <Image src={'/images/join-chat.png'} width={178} height={164} alt="" />{' '}
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
          href=""
        />
      </div>
      <div>
        {workspaces?.organizations?.map((ws) => (
          <div key={ws.organization?.id}>
            {ws.organization?.name}
            <Link href={'/' + ws.organization?.id}> Launch App</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
