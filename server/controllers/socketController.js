// server/controllers/socketController.js

const userUtils = require('../utils/users');
const Message = require('../models/Message'); // Import the Message model

const registerSocketHandlers = (io, socket) => {

  // Handle user joining
  socket.on('user_join', async (username) => {
    try {
      const user = userUtils.addUser(socket.id, username);
      console.log(`${user.username} joined the chat`);

      // Load last 100 messages from DB
      const oldMessages = await Message.find()
        .sort({ timestamp: 1 }) // 1 for ascending (oldest first)
        .limit(100);
      
      // Send only to the newly connected user
      socket.emit('load_old_messages', oldMessages);

      io.emit('user_list', userUtils.getUsers());
      
      // Announce new user to everyone
      const joinMessage = {
        id: Date.now(),
        system: true,
        message: `${user.username} joined the chat`,
        timestamp: new Date().toISOString(),
      };
      // We don't save system messages, just emit
      io.emit('receive_message', joinMessage); 

    } catch (error) {
      console.error('Error in user_join:', error);
    }
  });

  // Handle chat messages
  socket.on('send_message', async (messageData) => {
    const user = userUtils.getUser(socket.id);
    if (!user) return;

    try {
      const message = new Message({
        sender: user.username,
        senderId: socket.id,
        message: messageData.message,
      });

      await message.save(); // Save message to MongoDB
      
      io.emit('receive_message', message); // Send saved message to all
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    if (isTyping) {
      userUtils.addTypingUser(socket.id);
    } else {
      userUtils.removeTypingUser(socket.id);
    }
    io.emit('typing_users', userUtils.getTypingUsers());
  });

  // Handle private messages
  socket.on('private_message', async ({ to, message }) => {
    const user = userUtils.getUser(socket.id);
    if (!user) return;

    try {
      const messageData = new Message({
        sender: user.username,
        senderId: socket.id,
        message,
        isPrivate: true,
        to,
      });

      await messageData.save(); // Save private message to DB

      // Emit to the recipient
      socket.to(to).emit('private_message', messageData);
      // Also emit to the sender
      socket.emit('private_message', messageData);

    } catch (error) {
      console.error('Error saving private message:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = userUtils.removeUser(socket.id);
    userUtils.removeTypingUser(socket.id);
    
    if (user) {
      console.log(`${user.username} left the chat`);

      const leftMessage = {
        id: Date.now(),
        system: true,
        message: `${user.username} left the chat`,
        timestamp: new Date().toISOString(),
      };
      
      io.emit('receive_message', leftMessage); // Announce departure
      io.emit('user_list', userUtils.getUsers());
      io.emit('typing_users', userUtils.getTypingUsers());
    }
  });
};

module.exports = { registerSocketHandlers };