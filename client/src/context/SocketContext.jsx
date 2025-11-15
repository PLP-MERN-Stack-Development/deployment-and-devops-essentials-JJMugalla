// client/src/context/SocketContext.jsx

import React, { createContext, useContext } from 'react';
import { useSocket }_ from '../socket/socket'; // Your hook

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketHookData = useSocket();

  return (
    <SocketContext.Provider value={socketHookData}>
      {children}
    </SocketContext.Provider>
  );
};