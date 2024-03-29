import mongoose,{Document,Schema} from "mongoose";

export interface Imessage extends Document {
    senderId:number,
    receiverId:number,
    groupId: number,
    text: string,
}


const messagesSchema:Schema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    groupId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Group',
        required: true
    },
    text : {
        type: String,
        required:true
    },
    receiverId :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const messsagesModel = mongoose.model<Imessage>('Message',messagesSchema);

export default messsagesModel;
