'use client';
import { useGetAuthUserProfile } from '@/app/api/users/users';
import { useAppDispatch } from '@/hooks/useRedux';
import { setAuth } from '@/lib/features/auth/authSlice';
import { ReactNode, useEffect } from 'react';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  const { data } = useGetAuthUserProfile({ query: { select: (res) => res.data } });

  useEffect(() => {
    if (data) {
      dispatch(setAuth(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <>{children}</>;
};
export default AuthProvider;
