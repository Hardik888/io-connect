import groupModel, { Igroup } from '../../models/groupSchema';
import { Request,Response } from 'express';
import userModel,{Iuser} from '../../models/userSchema';

export const createGroup = async (req:Request,res:Response) => {
    try {
        const {name} = req.body;
        if(!name) {
            return res.status(400).json({message:'Group name required'});

        }
        const group = new groupModel({name});
        await group.save();
        return res.status(201).json({message:'Group created '});

    }catch(error) {
        console.log('error creating group');
        return res.status(500).json({message:'internal error'});
    }
}

export const addUserToGroup = async (req: Request, res: Response) => {
    try {
        const { groupId, userId } = req.body;
        if (!groupId || !userId) {
            return res.status(400).json({ message: 'Both groupId and userId are required' });
        }

        // Check if the user exists
        const user: Iuser | null = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the group
        const group = await groupModel.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Add user to the group
        group.users.push(user._id);
        await group.save();

        return res.status(200).json({ message: 'User added to group successfully', group });
    } catch (error) {
        console.error('Error adding user to group:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};