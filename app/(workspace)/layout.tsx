'use client';
import React, { useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { usePostAuthOrganizationsJoin } from '../api/organizations/organizations';
import { RequestJoinOrganizationRequest } from '../api/generated.schemas';
import { clearClientCookies } from '@/utils/cookie.client';

const LayoutWorkSpace = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalInviteOpen, setIsModalInviteOpen] = useState(false);
  const { mutate, isPending } = usePostAuthOrganizationsJoin();

  const router = useRouter();

  const toggleModalInvite = () => setIsModalInviteOpen(!isModalInviteOpen);

  const handleSubmit = (value: RequestJoinOrganizationRequest) => {
    mutate(
      { data: value },
      {
        onSuccess: () => {
          setIsModalInviteOpen(false);
          router.refresh();
        },
      },
    );
  };

  return <div> {children}</div>;
};

export default LayoutWorkSpace;
