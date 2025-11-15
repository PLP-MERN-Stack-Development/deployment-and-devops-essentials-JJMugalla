// server/utils/users.js

const users = {};       // { socketId: { username, id } }
const typingUsers = {}; // { socketId: username }

const addUser = (socketId, username) => {
  const user = { username, id: socketId };
  users[socketId] = user;
  return user;
};

const removeUser = (socketId) => {
  const user = users[socketId];
  delete users[socketId];
  return user;
};

const getUser = (socketId) => users[socketId];

const getUsers = () => Object.values(users);

const addTypingUser = (socketId) => {
  const user = getUser(socketId);
  if (user) {
    typingUsers[socketId] = user.username;
  }
};

const removeTypingUser = (socketId) => {
  delete typingUsers[socketId];
};

const getTypingUsers = () => Object.values(typingUsers);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsers,
  addTypingUser,
  removeTypingUser,
  getTypingUsers,
};