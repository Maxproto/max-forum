// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');  // for socket.io
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const User = require('./models/User');
const ChatMessage = require('./models/ChatMessage');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

// Socket.io real-time connection
io.on('connection', async (socket) => {
    console.log('User connected:', socket.id);
  
    // 1. 获取历史消息
    const history = await ChatMessage.find().sort({ createdAt: 1 }).limit(50);
    socket.emit('chat history', history);
  
    // 2. 监听消息发送
    socket.on('chat message', async ({ token, text }) => {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;
  
        const user = await User.findById(userId);
        if (!user) return;
  
        const newMsg = new ChatMessage({
          user: user._id,
          username: user.username,
          text
        });
  
        await newMsg.save();
  
        io.emit('chat message', {
          username: user.username,
          text: newMsg.text,
          createdAt: newMsg.createdAt
        });
      } catch (err) {
        console.error('Message error:', err.message);
      }
    });
  });  

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Web Forum API!');
});

// Import user and post routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
