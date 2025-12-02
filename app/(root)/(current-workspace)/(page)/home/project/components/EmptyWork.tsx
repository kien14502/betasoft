'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CreateWorkModal = dynamic(() => import('../components/modals/CreateWorkModal'), {
  loading: () => <div>loading...</div>,
  ssr: false,
});

/* eslint-disable @next/next/no-img-element */
const EmptyWork = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggle = () => setIsOpenModal(!isOpenModal);

  return (
    <div className="max-w-[579px] w-full flex flex-col items-center mx-auto">
      <img width={300} height={200} src={'/images/create-work.png'} alt="" />
      <p className="text-2xl font-semibold text-center">
        The “Invoice Maker” project to-do list is empty!
      </p>
      <span className="text-[#787878] text-center mt-2">
        Requests from multiple sources are filtered into your queues, ready
        <br /> for triage and assignment.
      </span>
      <Dialog open={isOpenModal} onOpenChange={toggle}>
        <DialogTrigger asChild>
          <button
            onClick={toggle}
            className="rounded-[64px] mt-6 shadow-btn font-semibold text-[18px] color-main flex items-center gap-3 py-4 px-6 active:scale-95 transition-all duration-100"
          >
            <Image width={32} height={32} src={'/icons/plus.svg'} alt={''} />
            Create Work
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[876px] p-0 rounded-xl shadow-popup">
          <DialogHeader className="border-b py-6 px-8 gap-1 border-gray-4">
            <DialogTitle className="text-[#0045AC] text-2xl font-semibold">NEW TASK</DialogTitle>
            <DialogDescription className="text-[#787878] text-sm font-normal">
              Required fields are marked with an asterisk <span className="text-[#F20005]">*</span>
            </DialogDescription>
          </DialogHeader>
          <CreateWorkModal toggle={toggle} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default EmptyWork;
