'use client';
import { getSelector, useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { getMe } from '@/lib/features/auth/actions';
import { getInforWorkspace } from '@/lib/features/workspace/action';
import { ReactNode, useEffect, useMemo } from 'react';
import LoadingScreen from '../common/loading/LoadingScreen';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector(getSelector('auth'));
  const wsId = useMemo(
    () => user?.meta_data.organization?.id ?? null,
    [user?.meta_data.organization?.id],
  );

  useEffect(() => {
    if (isAuthenticated) return;
    dispatch(getMe());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (wsId) {
      dispatch(getInforWorkspace({ id: wsId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wsId]);

  if (!isAuthenticated) return <LoadingScreen />;

  return <>{children}</>;
};
export default AuthProvider;
