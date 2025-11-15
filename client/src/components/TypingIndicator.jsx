// client/src/components/TypingIndicator.jsx

import React from 'react';
import { useSocketContext } from '../context/SocketContext';

const TypingIndicator = () => {
  const { typingUsers } = useSocketContext();

  if (typingUsers.length === 0) {
    return <div className="typing-indicator" />;
  }

  const names = typingUsers.join(', ');
  const verb = typingUsers.length > 1 ? 'are' : 'is';

  return (
    <div className="typing-indicator">
      <em>{names} {verb} typing...</em>
    </div>
  );
};

export default TypingIndicator;