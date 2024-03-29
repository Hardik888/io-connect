import mongoose, { Schema ,Document} from "mongoose";
import { Imessage } from "./messageSchema";
export interface Igroup extends Document {
    name: string,
    users: mongoose.Types.ObjectId[]; // Array of user IDs

    messages: Imessage[];
}

const groupSchema:Schema = new mongoose.Schema ({
    name: {
        type:String,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
      type:Schema.Types.ObjectId,
      ref:'Message'
    }]
})

const groupModel = mongoose.model<Igroup>('groupSchema',groupSchema);

export  default groupModel;
