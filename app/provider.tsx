'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Provider from '@/store/Provider';
import AuthProvider from '@/components/providers/AuthProvider';

const ProviderConfig = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider>{children}</Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default ProviderConfig;
