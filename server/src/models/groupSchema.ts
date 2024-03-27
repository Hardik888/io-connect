import mongoose from "mongoose";

const groupSchema = new mongoose.Schema ({
    name: {
        type:String,
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

const groupModel = mongoose.model('groupSchema',groupSchema);

export  default groupModel;
