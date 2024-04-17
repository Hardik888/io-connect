import mongoose,{Document,Schema} from "mongoose";

export interface Imessage extends Document {
    // senderId?: mongoose.Schema.Types.ObjectId | null; // Optional sender ID (can be retrieved from context)
    createdBy: mongoose.Schema.Types.ObjectId;
    groupId: mongoose.Schema.Types.ObjectId;
    text: string;

}


const messagesSchema:Schema = new mongoose.Schema({
    // senderId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
      groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },

},{
  timestamps:true
})

const messsagesModel = mongoose.model<Imessage>('Message',messagesSchema);

export default messsagesModel;
