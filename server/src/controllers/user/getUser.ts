import { Request,Response } from "express";

import userModel ,{Iuser} from "../../models/userSchema";


const getAllUsers = async (req:Request,res:Response) =>{
    try {
        const groups = await userModel.find();
        console.log('All groups',groups);
        return res.json(groups);
   }catch(error) {
    console.error('Error fetching Groups' ,error);
    return res.status(500).json({error:'Internal Server Error'});
   }

}
export default getAllUsers;