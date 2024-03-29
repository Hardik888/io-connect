import { Request,Response } from "express";

import userModel ,{Iuser} from "../../models/userSchema";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }
        const user = new userModel({ username });
        await user.save();
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};