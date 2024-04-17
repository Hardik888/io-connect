import { Request,Response } from "express";
import { config } from "dotenv";
import * as argon2 from "argon2";
import userModel ,{Iuser} from "../../models/userSchema";

// Loading all the configs
config(); 


export const createUser = async (req: Request, res: Response) => {
    try {
        const { username ,password} = req.body;
        if (!username && password) {
            return res.status(400).json({ message: 'Username is required' });
        }
        const hashedpassword = await argon2.hash(password);

        const user = new userModel({ username,password:hashedpassword});
        await user.save();
        return res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};