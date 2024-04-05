const CreateUser = async(username:string) => {
try{
    const response = await fetch('http://localhost:5000/create',{
        method:
        'Post',
        headers:{
        'Content-type':'application/json',},
        body: JSON.stringify({
            username: username
        })
        })
    if (!response.ok) {
        console.log('Error creating User',response.statusText);
    }
}
catch(error){
    console.error('Error',error);
}
}

export default CreateUser;