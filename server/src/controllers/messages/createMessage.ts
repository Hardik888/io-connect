import { Request,Response } from "express";
import messsagesModel ,{Imessage} from "../../models/messageSchema";

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { senderId, receiverId, groupId, text } = req.body;
        if (!senderId || !receiverId || !groupId || !text) {
            return res.status(400).json({ message: 'Sender ID, receiver ID, group ID, and text are required' });
        }
        const message = new messsagesModel({ senderId, receiverId, groupId, text });
        await message.save();
        return res.status(201).json({ message: 'Message created successfully' });
    } catch (error) {
        console.error('Error creating message:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};