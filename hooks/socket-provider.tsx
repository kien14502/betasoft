'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import url from '@/config/endpoint';
import { getClientCookie } from '@/utils/cookie.client';

type WSContextType = {
  ws: WebSocket | null;
  isConnected: boolean;
};

const WSContext = createContext<WSContextType>({
  ws: null,
  isConnected: false,
});

export function WebSocketProvider({ children }: { children: React.ReactNode }) {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const accessToken = getClientCookie('accessToken');

  useEffect(() => {
    ws.current = new WebSocket(url.BASE_URL + `/auth/ws?accesstoken=${accessToken}`);

    ws.current.onopen = () => {
      setIsConnected(true);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
    };

    return () => ws.current?.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WSContext.Provider value={{ ws: ws.current, isConnected }}>{children}</WSContext.Provider>
  );
}

export function useWS() {
  return useContext(WSContext);
}
