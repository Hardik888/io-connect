import {server,app} from './Connections/SocketConn'
import userRoutes from './routes/userRoutes';
import {socketconn} from './Connections/SocketioMessageEvent';

import groupRoutes from './routes/groupRoutes';
import { config } from 'dotenv';
config();
import messageRoutes from './routes/messageRoutes';
import { MongoConn } from './Connections/MongoConn';
app.use('/', userRoutes);
app.use('/', groupRoutes);
app.use('/', messageRoutes);
MongoConn();
socketconn();
server.listen(process.env.port, () => {
  console.log(`Server running `);
});
