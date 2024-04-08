import { io } from "./SocketConn";

export const socketconn = () => {
io.on('connection', (socket) => {
 
 socket.on('send-message',async(data) => {
    const {groupId,message} = data;
    
 })
 
    console.log('New client connected:', socket.id);
  
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}