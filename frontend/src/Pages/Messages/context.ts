import { createContext } from 'react';
import { IMessagesPageContext } from './typing';

export const MessagesPageContext = createContext<IMessagesPageContext>({
  activeGroupId: -1,
  // thumb
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveGroupId: () => {},
});
