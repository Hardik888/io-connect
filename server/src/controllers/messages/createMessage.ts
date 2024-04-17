import { Request, Response } from "express";
import messsagesModel, { Imessage } from "../../models/messageSchema";

import userModel from "../../models/userSchema";

import { server, io } from '../../Connections/SocketConn';

import groupModel from "../../models/groupSchema";

export const createMessage = async (req: Request, res: Response) => {

    const { groupId, createdBy, text } = req.body;
    if (!groupId || !createdBy || !text) {
        return res.status(400).json({ message: 'Sender ID, receiver ID, group ID, and text are required' });
    }
    try {
        const message = new messsagesModel({ groupId, createdBy, text });
        await groupModel.findByIdAndUpdate(groupId, {
            $push: { messages: message._id }
        }, {
            new: true,
            upsert: false

        })
        const savedmessage = await message.save();
        io.to(groupId).emit('new_message',{
            groupId:savedmessage.groupId,
            message: savedmessage.text,
            createdBy: savedmessage.createdBy
        },
    
    console.log('message sent')
    );
        
        return res.status(201).json({ message: 'Message created successfully', data: savedmessage });
    }
    catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};