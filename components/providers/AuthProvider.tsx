'use client';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getMe } from '@/lib/features/auth/actions';
import { getListWorkspaces } from '@/lib/features/list-workspace/action';
import { getInforWorkspace, getMembers } from '@/lib/features/workspace/action';
import { ReactNode, useEffect } from 'react';
import LoadingScreen from '../common/loading/LoadingScreen';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(getSelector('auth'));

  useEffect(() => {
    dispatch(getMe())
      .unwrap()
      .then((data) => {
        const wsId = data.meta_data.organization?.id ?? null;
        if (wsId) {
          dispatch(getListWorkspaces());
          dispatch(getInforWorkspace({ id: wsId }));
          dispatch(getMembers({ id: wsId }));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isAuthenticated) return <LoadingScreen />;

  return <>{children}</>;
};
export default AuthProvider;
