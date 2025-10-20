'use client';

import React from 'react';
import styles from './dashboard.module.css';
import Link from 'next/link';
import { IMenuItem } from '@/interface/common';
import { mainRoutes } from '@/constants/routes';
import { useGetAuthUserProfile } from '@/app/api/users/users';
import { Avatar } from 'antd';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';

import Image from 'next/image';
import { useStore, actions } from '@/store';
import { cn } from '@/utils/common';

function MenuDashboard() {
  const [{ menu }, dispatch] = useStore();
  const setCurrentMenu = (key: string) => {
    dispatch(actions.setActiveMenu(key));
  };

  const { data } = useGetAuthUserProfile();
  const userProfile = data?.data;

  const MenuItem = (item: IMenuItem) => (
    <Link href={item.path} onClick={() => setCurrentMenu(item.index)}>
      <div
        className={cn(
          '!p-4 rounded-[64px] flex items-center gap-3 justify-center group-hover:justify-start',
          menu.activeMenuKey === item.index &&
            'bg-[#E5F1FF] !py-8 group-hover:!py-4 text-[#131315]',
        )}
      >
        {item.icon && (
          <item.icon
            style={{ fontSize: '24px', color: menu.activeMenuKey === item.index ? '#0045AC' : '' }}
          />
        )}
        <div className="hidden group-hover:block font-normal text-[16px]">{item.label}</div>
      </div>
    </Link>
  );

  return (
    <div className={styles['menu-wrapper'] + ' group'}>
      <div className={'flex flex-col gap-4'}>
        {mainRoutes.map((item) => (
          <MenuItem key={item.index} {...item} />
        ))}
        <button className="color-main shadow-btn !py-[64px] group-hover:!py-3 !px-4 rounded-[64px] flex items-center flex-row">
          <Image className="fill-red-300" src={'/icons/plus.svg'} width={29} height={29} alt="" />
          <span className="hidden group-hover:block font-semibold cursor-pointer gap-2">
            New Task
          </span>
        </button>
      </div>

      <div className="w-full flex flex-col items-center">
        <Avatar src={userProfile?.profile_image} size={48} icon={<UserOutlined />} />
        <div
          style={{ padding: '16px' }}
          className="flex items-center w-full justify-center group-hover:justify-start"
        >
          <SettingOutlined style={{ fontSize: '32px' }} />
          <span className="hidden group-hover:block text-[18px]">Settings</span>
        </div>
      </div>
    </div>
  );
}

export default MenuDashboard;
