import { Request,Response } from "express";
import messsagesModel ,{Imessage} from "../../models/messageSchema";
import userModel from "../../models/userSchema";

import {server,io} from '../../Connections/SocketConn';

export const createMessage = async (req: Request, res: Response) => {

const {  groupId,createdBy, text } = req.body;
if (!groupId || createdBy  || !text) {
return res.status(400).json({ message: 'Sender ID, receiver ID, group ID, and text are required' });
}
try {

const message = new messsagesModel({ groupId, createdBy, text });

await message.save();

return res.status(201).json({ message: 'Message created successfully' });
}
catch (error) {
console.error('Error creating message:', error);
return res.status(500).json({ message: 'Internal server error' });
}
};