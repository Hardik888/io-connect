import groupModel from "../../models/groupSchema";


const getAllGroups = async () =>{
    try {
        const groups = await groupModel.find();
        console.log('All groups',groups);
        return groups;
   }catch(error) {
    console.error('Error fetching Groups' ,error);
    throw error;

   }

}
export default getAllGroups;