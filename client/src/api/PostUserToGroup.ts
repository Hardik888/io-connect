

export const addUserToGroup = async(groupId:string,userId:string[]) => {

try {
    const response = await fetch('http://localhost:5000/addUserToGroup',{
        method:'Post',
        headers: {
    'Content-Type':'application/json'
        },
        body: JSON.stringify({
            groupId,
            userId,
        })
    })
    if (!response.ok) {
        console.error('Error Adding Users to Group',response.statusText);
    
    }
    const updatedGroups = await response.json();
    return updatedGroups;
}
catch(error){
    console.error('Error adding user to group',error);
    
}

}