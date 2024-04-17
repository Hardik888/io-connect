import { Request, Response, NextFunction } from "express";

import * as argon2 from  "argon2";

import jwt from "jsonwebtoken";

import { config } from 'dotenv';

config();

import { io} from "../../Connections/SocketConn";

import userModel, { Iuser } from "../../models/userSchema";

const LoginUser = async (req: Request, res: Response) => {
    try {

       
       
        const { username, password } = req.body;
        const existingUser = await userModel.findOne({ username });
        
        console.log("the hash is ",existingUser?.password);

        if (!existingUser) {
            return res.status(401).json({ message: 'Username is incorrect' });
        }

        const isPasswordValid = await argon2.verify(existingUser.password, password);
       
        if (!isPasswordValid) 
{

    return res.status(401).json({ message: 'Incorrect password' });
        
}
    
        const token = jwt.sign({ userId: existingUser._id },process.env.jwtsecret || " ", { expiresIn: '1h' });
        io.emit('updatedSocketId',existingUser._id);
        return res.status(200).json({ message: 'User logged in', token ,userId:existingUser._id});
  
        
    } catch (error) {6
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
    
}

export default LoginUser;
