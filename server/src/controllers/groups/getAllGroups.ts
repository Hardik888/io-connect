import groupModel from "../../models/groupSchema";
import { Request,Response } from "express";

const getAllGroups = async (req:Request,res:Response) =>{
    try {
        const groups = await groupModel.find();
        console.log('All groups',groups);
        return res.json(groups);
   }catch(error) {
    console.error('Error fetching Groups' ,error);
    return res.status(500).json({error:'Internal Server Error'});

   }

}
export default getAllGroups;