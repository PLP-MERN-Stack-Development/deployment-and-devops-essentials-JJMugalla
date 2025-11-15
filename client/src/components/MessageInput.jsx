// client/src/components/MessageInput.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useSocketContext } from '../context/SocketContext';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, setTyping } = useSocketContext();
  const typingTimeoutRef = useRef(null);

  const handleTyping = () => {
    if (!typingTimeoutRef.current) {
      setTyping(true);
    }

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      typingTimeoutRef.current = null;
    }, 2000); // 2 seconds after last keystroke
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
      setTyping(false); // Stop typing on send
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input-form">
      <input
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageInput;