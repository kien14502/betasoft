'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StoreProvider from './StoreProvider';

const ProviderConfig = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // Tắt cho tất cả queries
            refetchOnMount: false, // Tắt refetch khi component mount
            refetchOnReconnect: false, // Tắt refetch khi reconnect internet
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
      <StoreProvider>{children}</StoreProvider>
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
};

export default ProviderConfig;
