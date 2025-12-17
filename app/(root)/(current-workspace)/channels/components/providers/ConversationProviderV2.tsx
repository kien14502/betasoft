'use client';

import { ChatMessage } from '@/interface/conversation';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

type State = {
  messages: ChatMessage[];
};

type Action =
  | { type: 'INIT'; payload: ChatMessage[] }
  | { type: 'ADD'; payload: ChatMessage }
  | { type: 'DELETE'; payload: { id: string } };

const initialState: State = { messages: [] };

//Handle message here

const conversationReducer = (state: State, action: Action) => {
  const { payload, type } = action;
  switch (type) {
    case 'INIT':
      const initMessages = payload.concat(state.messages);
      return { messages: initMessages };
    case 'ADD':
      return { messages: [...state.messages, payload] };
    case 'DELETE':
      const allMessages = state.messages.filter((item) => item.id === payload.id);
      return { messages: allMessages };
    default:
      return state;
  }
};

type StateContext = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const ConversationContext = createContext<StateContext>({
  state: initialState,
  dispatch: () => {},
});

const ConversationProviderV2 = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(conversationReducer, initialState);

  return (
    <ConversationContext.Provider value={{ dispatch, state }}>
      {children}
    </ConversationContext.Provider>
  );
};
export default ConversationProviderV2;
