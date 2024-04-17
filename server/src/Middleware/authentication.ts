import { Request,Response,NextFunction } from "express";

import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
interface AuthUser extends Request {
    user? : any
}


const verifytoken = (req:AuthUser,res:Response,next:NextFunction) => {

try {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({message:'Unauthorized'});

    }
    const decoded = jwt.verify(token,process.env.jwtsecret||" ");
    req.user = decoded;
    next();
}catch(error) {
    return res.status(401).json({message:'Invalid TOKEN'});

}



}
export default verifytoken;