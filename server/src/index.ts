import express, { Application } from "express";
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import messageRoutes from './routes/messageRoutes';
const app: Application = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


app.use(cors({
    origin:"*",
}))
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/myDatabase", {
  
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('MongoDB connection error:', error);
});

app.use('/', userRoutes);
app.use('/', groupRoutes);
app.use('/', messageRoutes);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
