import { useAppDispatch } from '@/app/reduxs/hooks';
import { addTab } from '@/app/reduxs/tabs/tabs.slice';
import Link from 'next/link';
import React from 'react';
import ComponentLazyMap from '../../common/ComponentLazyMap';

function LogoDashboard() {
  const dispatch = useAppDispatch();
  return (
    <Link
      href={'../dashboard'}
      style={{ color: 'black' }}
      onClick={() =>
        dispatch(
          addTab({
            label: 'Dashboard',
            key: 'Dashboard',
            children: <ComponentLazyMap.Dashboard />,
          }),
        )
      }
    >
      <div
        style={{
          backgroundColor: 'Tan',
          height: '7vh',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h2>Trip Admin</h2>
      </div>
    </Link>
  );
}

export default LogoDashboard;
