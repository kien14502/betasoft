'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from './StoreProvider';

const ProviderConfig = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <StoreProvider>{children}</StoreProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
};

export default ProviderConfig;
