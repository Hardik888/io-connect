 export const fetchdata = async () => {

      try {

        const groupresponse = await fetch('http://localhost:5000/getAllGroups');

        if (!groupresponse.ok) {

          throw new Error('Failed to fetch groups');

        }
        const Groupsdata = await groupresponse.json();


        console.log(Groupsdata)

        const userresponse = await fetch('http://localhost:5000/getusers');

        if (!userresponse.ok) {

          throw new Error('Failed to fetch users');

        }
        const Usersdata = await userresponse.json();

        console.log(Usersdata)
        return {groupsfetchData:Groupsdata,usersfetchData:Usersdata};


      }
      catch (error) {

        console.error('Error fetching data:', error);

      }
    };
