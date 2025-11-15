// client/src/pages/ChatPage.jsx

import React from 'react';
import UserList from '../components/UserList';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import TypingIndicator from '../components/TypingIndicator';
import { useSocketContext } from '../context/SocketContext';

const ChatPage = () => {
  const { disconnect } = useSocketContext();

  return (
    <div className="chat-page">
      <header className="chat-header">
        <h1>Socket.io Chat</h1>
        <button onClick={disconnect} className="disconnect-btn">
          Leave Chat
        </button>
      </header>
      <div className="chat-main">
        <UserList />
        <div className="chat-content">
          <ChatWindow />
          <TypingIndicator />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;