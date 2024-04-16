import { server, app } from './Connections/SocketConn'
import userRoutes from './routes/userRoutes';
import { io } from './Connections/SocketConn';
import groupRoutes from './routes/groupRoutes';
import { config } from 'dotenv';
config();
import messageRoutes from './routes/messageRoutes';
import { MongoConn } from './Connections/MongoConn';
import userModel from './models/userSchema';
app.use('/', userRoutes);
app.use('/', groupRoutes);
app.use('/', messageRoutes);
MongoConn();

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

io.on('connection', (socket) => {
    console.log('New connection', socket.id);

    // Join a group (room)
    socket.on('join_group', async (groupId) => {
        socket.join(groupId);
        console.log(`Socket ${socket.id} joined group ${groupId}`);
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    // Update socket ID for a user in the database
    socket.on('updatedSocketId', async (userId) => {
        try {
            await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            console.log('Socket ID updated for user', userId);
        } catch (error) {
            console.error('Error updating socket ID:', error);
        }
    });
});
