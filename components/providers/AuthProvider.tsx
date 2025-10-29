'use client';
import { ResponseGetUserInfoResponse } from '@/app/api/generated.schemas';
import { useGetAuthUserProfile } from '@/app/api/users/users';
import { createContext, ReactNode, useEffect, useState } from 'react';

type AuthContext = {
  profile: ResponseGetUserInfoResponse | null;
  isAuthenticated: boolean;
};

const defaultAuthContext: AuthContext = {
  profile: null,
  isAuthenticated: false,
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContext>(defaultAuthContext);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [profile, setProfile] = useState<ResponseGetUserInfoResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data, isError } = useGetAuthUserProfile();

  useEffect(() => {
    if (data) {
      setProfile(data.data ?? null);
      setIsAuthenticated(true);
    } else if (isError) {
      setProfile(null);
      setIsAuthenticated(false);
    }
  }, [data, isError]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, profile }}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
