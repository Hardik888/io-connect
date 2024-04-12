import {server,app} from './Connections/SocketConn'
import userRoutes from './routes/userRoutes';
import { io } from './Connections/SocketConn';
import groupRoutes from './routes/groupRoutes';
import { config } from 'dotenv';
config();
import messageRoutes from './routes/messageRoutes';
import { MongoConn } from './Connections/MongoConn';
import { Socket } from 'socket.io';
import userModel from './models/userSchema';
app.use('/', userRoutes);
app.use('/', groupRoutes);
app.use('/', messageRoutes);
MongoConn();

server.listen(process.env.PORT, () => {
  console.log(`Server running ${process.env.PORT}`);
});
io.on('connection',(socket)=>{
  console.log('New connection',socket.id);
  
  socket.on('updatedSocketId',async(userId)=>{
    try{
      await userModel.findByIdAndUpdate(userId,{socketId:socket.id});
      console.log('Socketid updated for user',userId);
    }catch{console.error('error updating ');
}
})
})