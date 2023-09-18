import { GlobalMessage } from '../components/global-message';
import * as React from 'react';

import type { Message } from '../../types/messages';

export const MessageContext = React.createContext<{
  message?: Message;
  setMessage: React.Dispatch<React.SetStateAction<Message>>;
}>({ message: undefined, setMessage: () => undefined });

export const useGlobalMessage = () => React.useContext(MessageContext);

/**
 * It's a React context provider that provides ability to show messages at app level from everywhere
 */
export const GlobalMessagesProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [message, setMessage] = React.useState<Message>(undefined);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    if (message) {
      timeoutRef.current = setTimeout(() => setMessage(null), 3000);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [message]);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      <GlobalMessage type={message?.type}>{message?.value}</GlobalMessage>
      {children}
    </MessageContext.Provider>
  );
};
