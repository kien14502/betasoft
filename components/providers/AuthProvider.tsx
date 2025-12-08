'use client';
import { useGetAuthUserProfile } from '@/app/api/users/users';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { User } from '@/interface/auth';
import { setAuth } from '@/lib/features/auth/authSlice';
import { getListWorkspaces } from '@/lib/features/list-workspace/action';
import { getInforWorkspace, getMembers } from '@/lib/features/workspace/action';
import { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const { data } = useGetAuthUserProfile({ query: { select: (res) => res.data } });
  const { user } = useAppSelector(getSelector('auth'));

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data as User));
      dispatch(getListWorkspaces());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const wsId = user?.meta_data.organization?.id;
    if (wsId) {
      dispatch(getInforWorkspace({ id: wsId }));
      dispatch(getMembers({ id: wsId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
};
export default AuthProvider;
