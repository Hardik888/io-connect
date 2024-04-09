
export const fetchdata = async (token:any) => {

  try {
    const groupresponse = await fetch('http://localhost:5000/getAllGroups', {
      headers: {
        'Authorization': `Bearer ${token}` // Include token in Authorization header
      }
    });

    if (!groupresponse.ok) {
      throw new Error('Failed to fetch groups');
    }

    const Groupsdata = await groupresponse.json();

    const userresponse = await fetch('http://localhost:5000/getusers', {
      headers: {
        'Authorization': `Bearer ${token}` // Include token in Authorization header
      }
    });

    if (!userresponse.ok) {
      throw new Error('Failed to fetch users');
    }

    const Usersdata = await userresponse.json();

    console.log(Groupsdata);
    console.log(Usersdata);

    return { groupsfetchData: Groupsdata, usersfetchData: Usersdata };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
