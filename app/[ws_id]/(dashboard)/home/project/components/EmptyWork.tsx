'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useState } from 'react';

/* eslint-disable @next/next/no-img-element */
const EmptyWork = () => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const toggle = () => setIsOpenModal(!isOpenModal);

  return (
    <div className="max-w-[579px] w-full flex flex-col items-center !mx-auto">
      <img width={300} height={200} src={'/images/create-work.png'} alt="" />
      <p className="text-2xl font-semibold text-center">
        The “Invoice Maker” project to-do list is empty!
      </p>
      <span className="text-[#787878] text-center !mt-2">
        Requests from multiple sources are filtered into your queues, ready
        <br /> for triage and assignment.
      </span>
      <button
        onClick={toggle}
        className="rounded-[64px] !mt-6 shadow-btn font-semibold text-[18px] color-main flex items-center gap-3 !py-4 !px-6 active:scale-95 transition-all duration-100"
      >
        <Image width={32} height={32} src={'/icons/plus.svg'} alt={''} />
        Create Work
      </button>
      <CreateWorkModal isOpen={isOpenModal} toggle={toggle} />
    </div>
  );
};
export default EmptyWork;

const CreateWorkModal = dynamic(() => import('../components/modals/CreateWorkModal'));
