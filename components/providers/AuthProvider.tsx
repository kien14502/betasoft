'use client';
import { useGetAuthUserProfile } from '@/app/api/users/users';
import { useAppDispatch } from '@/hooks/useRedux';
import { User } from '@/interface/auth';
import { setAuth } from '@/lib/features/auth/authSlice';
import { getInforWorkspace, getMembers } from '@/lib/features/workspace/action';
import { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const { data } = useGetAuthUserProfile({ query: { select: (res) => res.data } });

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data as User));
      const wsId = data.meta_data?.organization?.id;
      if (wsId) {
        dispatch(getInforWorkspace({ id: wsId }));
        dispatch(getMembers({ id: wsId }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{children}</>;
};
export default AuthProvider;
