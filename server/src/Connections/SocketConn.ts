import express, {Application} from "express";

import {createServer} from 'http';

import {Server} from 'socket.io';
import cors from 'cors';

export const app: Application = express();
app.use(cors({
    origin:"*",
  }))
  app.use(express.json());
export const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});








module.exports = {server,io,app};