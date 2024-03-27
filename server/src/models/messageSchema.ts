import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
    sender: {
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
   
})

const messsagesModel = mongoose.model('Message',messagesSchema);

export default messsagesModel;
