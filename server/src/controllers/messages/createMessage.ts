import messsagesModel from "../../models/messageSchema";

const createMessage = async (senderId:Number,groupId:Number,text:string)=>{
    try {
        const message = new messsagesModel({senderId,groupId,text});
        await message.save();

    }catch(error){
        console.error('Error creating Message',error);
        throw error;
    }
}

export default createMessage;