import groupModel from '../../models/groupSchema';

const createGroup = async (groupName:string)=>{
    try {
        const group = new groupModel({name:groupName});
        await group.save();
        console.log('Group created',group);
        return group;
    }catch(error)
    {console.error('Error creating group',error)
    throw error;
    }
};
export default createGroup;

