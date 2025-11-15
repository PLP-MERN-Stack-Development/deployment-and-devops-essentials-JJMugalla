// server/models/Message.js

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isPrivate: {
    type: Boolean,
    default: false,
  },
  to: { // The socket ID of the recipient if private
    type: String,
    default: null,
  },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;