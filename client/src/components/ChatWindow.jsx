// client/src/components/ChatWindow.jsx

import React, { useEffect, useRef } from 'react';
import { useSocketContext } from '../context/SocketContext';

const ChatWindow = () => {
  const { messages, socket } = useSocketContext();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const formatTime = (isoString) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-window">
      {messages.map((msg, index) => {
        if (msg.system) {
          return (
            <div key={index} className="message system-message">
              {msg.message}
            </div>
          );
        }

        const isMine = msg.senderId === socket.id;
        const messageClass = isMine ? 'message my-message' : 'message other-message';

        return (
          <div key={index} className={messageClass}>
            <div className="message-bubble">
              {!isMine && <div className="message-sender">{msg.sender}</div>}
              <div className="message-text">{msg.message}</div>
              <div className="message-time">{formatTime(msg.timestamp)}</div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;