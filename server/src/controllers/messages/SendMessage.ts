import { io } from "../../Connections/SocketConn";
import { Request,Response } from "express";

export const SendMessage = async() => {
io.on('connection', (socket) => {
 console.log('A user connected');
 socket.on('send-message',async(data) => {
    const {groupId,message} = data;
if (groupId)
  {
    
  }
    
 })
 
    console.log('New client connected:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}