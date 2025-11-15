// client/src/components/UserList.jsx

import React from 'react';
import { useSocketContext } from '../context/SocketContext';

const UserList = () => {
  const { users, socket } = useSocketContext();

  return (
    <aside className="user-list">
      <h3>Online Users ({users.length})</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className={user.id === socket.id ? 'current-user' : ''}>
            {user.username} {user.id === socket.id && '(You)'}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserList;