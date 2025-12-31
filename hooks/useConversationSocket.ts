import { ESocketAction } from '@/constants';
import { Room } from '@/interface/conversation';
import { useEffect } from 'react';

const useConversationSocket = (ws: WebSocket | null, addConversation: (room: Room) => void) => {
  useEffect(() => {
    if (!ws) return;

    const handleCreateConversation = (event: MessageEvent) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.action === ESocketAction.NEW_ROOM) {
        addConversation(receivedData.data);
      }
    };

    ws.addEventListener('message', handleCreateConversation);

    return () => {
      ws.removeEventListener('message', handleCreateConversation);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws]);
};
export default useConversationSocket;
