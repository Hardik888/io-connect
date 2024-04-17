import mongoose,{Document,Schema} from "mongoose";
export interface Iuser extends Document {
    username: string,
    socketId: string,
    password : string,
}

 const userSchema:Schema = new mongoose.Schema({

    username:{
        type: String,
        required : true
    },
    socketId: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true,
    }

});

const userModel = mongoose.model<Iuser>('User',userSchema);

export default userModel;
