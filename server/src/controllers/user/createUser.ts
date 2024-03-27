import userModel from "../../models/userSchema";

const createUser = async (username:string) =>{

    try{
        const user = new userModel({username});
        await user.save();
        console.log('user created',user);
        return user;
    }catch(error){
        console.error('error',error);
        throw error;
    }
}

export default createUser;