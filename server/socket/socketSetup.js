// server/socket/socketSetup.js

const { Server } = require('socket.io');
const { registerSocketHandlers } = require('../controllers/socketController');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    // Register all event handlers for this socket
    registerSocketHandlers(io, socket);
  });

  return io;
};

module.exports = { initSocket };