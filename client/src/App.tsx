import './App.css';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface IGroup {
  _id: string,
  name: string,
  users: string[],
  messages: string[],
}

interface Iuser {
  _id: number,
  username: string
}

function App() {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [groups, setgroups] = useState<IGroup[]>([]);
  const [isaddingGroup,setisAddingGroup] = useState<boolean>(false);
  const [groupname,setgroupname] = useState<string>('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [allUsers, setAllUsers] = useState<Iuser[]>([]);
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
  const [isAddingUsers, setIsAddingUsers] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  useEffect(() => {

    const newSocket = io("http://localhost:5000", {

      withCredentials: true,

    });

    setSocket(newSocket);

    return () => {

      newSocket.disconnect();
    };

  }, []);

  useEffect(() => {
    if (socket) {

      socket.on('connect', () => {

        console.log("Socket connected, ID:", socket.id);

      });

      return () => {

        socket.off('connect');

      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchdata = async () => {

      try {

        const groupresponse = await fetch('http://localhost:5000/getAllGroups');

        if (!groupresponse.ok) {

          throw new Error('Failed to fetch groups');

        }
        const Groupsdata = await groupresponse.json();
   
        setgroups(Groupsdata);

        console.log(Groupsdata)

        const userresponse = await fetch('http://localhost:5000/getusers');

        if (!userresponse.ok) {

          throw new Error('Failed to fetch users');

        }
        const Usersdata = await userresponse.json();

        console.log(Usersdata)

        setAllUsers(Usersdata);

      }
      catch (error) {

        console.error('Error fetching data:', error);

      }
    };

    fetchdata();
  }, [])
  // useEffect(() => {
  //   console.log("Groups in useEffect:", groups);
  //   if (!Array.isArray(groups)) {
  //     console.error("Groups is not an array:", groups);
  //     return;
  //   }
  
  //   if (typeof selectedGroup !== 'string') {
  //     console.error("Selected group is not a string:", selectedGroup);
  //     return;
  //   }
  
  //   if (selectedGroup) {
  //     const group = groups.find(group => group._id === selectedGroup);
  //     if (!group) {
  //       console.error("Selected group not found:", selectedGroup);
  //       return;
  //     }
  //     const filteredUsers = group.users || [];
  //     setGroupUsers(filteredUsers);
  //   } else {
  //     setGroupUsers([]);
  //   }
  // }, [selectedGroup, groups]);
  const addgroups = async() =>{
    const response = await fetch('http://localhost:5000/groups/create',{
      method:'Post',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        name : groupname
      })
    })
    if (!response.ok) {
      console.error('Error adding users to group:', response.statusText);
      return;
    }
    
  }
  const handlegroupckick = () => {

    setisAddingGroup(prevIsAddingGroup => !prevIsAddingGroup);

  }

  const handleAddUserClick = () => {
    setIsAddingUsers(!isAddingUsers);
    setSelectedUsers([]);
  }
  const handleUserCheckboxchange = async(userId:string ,isChecked:boolean) =>

  {
    if (isChecked) {
      setSelectedUsers([...selectedUsers,userId]);

    }else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId)); // Remove user ID from selection
    }
  }

  const handleAddUserToGroup = async () => {
    if (!selectedGroup || selectedUsers.length === 0) {
      alert('Please select a group and users to add.');
      return;
    }

    const response = await fetch('http://localhost:5000/addUserToGroup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        groupId: selectedGroup,
        userId: selectedUsers,
      }),
    });

    if (!response.ok) {
      console.error('Error adding users to group:', response.statusText);
      return;
    }

    // Update groups state locally if successful (assuming backend updates data)
    // const updatedGroups = await response.json();
    // setgroups(updatedGroups);

    // Clear selection and exit "Add Users" mode
    setSelectedUsers([]);
    setIsAddingUsers(false);
  };
  
  


  return (
    <div className="app-container">
      <header>
        <h1 className="app-heading">CHAT NOW</h1>
      </header>
      <main className="chat-container">
        <div className="users-sidebar">
          <h3>All Users</h3>
          <ul>
            {allUsers.map((user) => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
        {groups.length > 0 ? (
        <div className="sidebar">
          <button className='Addgroups' onClick={handlegroupckick}>
           +
          </button>
          {isaddingGroup && (
          <form>
      <label className='groupname'>Enter Groupname
        <input
          className="user-input-group"
          placeholder='entergroupname'
          type="text" 
          value={groupname}
          onChange={(e) => setgroupname(e.target.value)}
        />
        <button className='sendbutton'></button>
      </label>
    </form>
)}
          <h2>Groups</h2>
          <ul>
            {groups.map((group) => (
              <li
                key={group._id}
                className={selectedGroup === group._id ? "active" : "unactive"}
                onClick={() => {
                  setSelectedGroup(group._id);
                  console.log(group._id);
                }}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading groups...</p>
      )}
        <div className="chat">
          <div className="chat-header">
          {selectedGroup && Array.isArray(groups) && groups.length > 0 && (
  <h2 className="groupheader">
    {groups.find((group) => group._id === selectedGroup)?.name}
  </h2>
)}
          </div>
          <div className="chat-messages">
            {/* Your message display logic here */}
          </div>
          <div className="user-input">
            <input type="text" placeholder="Type your message..." />
            <button
              className="attachment-button"
              onClick={handleAddUserClick} // Call handleAddUserClick on button click
            >
              {isAddingUsers ? "Close" : "Add Users"} {/* Toggle text based on state */}
            </button>
            <button>Send</button>
          </div>
          {/* Added conditional rendering for "Add Users" section */}
          {isAddingUsers && (
            <div className="add-users-container">
              <h3>Add Users to Group</h3>
              <ul>
                {allUsers.map((user) => (
                  <li key={user._id}>
                    <input
                      type="checkbox"
                      id={`user-${user._id}`}
                      checked={selectedUsers.includes(user._id.toString())} // Check if user ID is selected
                      onChange={() =>
                        handleUserCheckboxchange(user._id.toString(), !selectedUsers.includes(user._id.toString()))
                      } // Convert IDs to strings
                    />
                    <label htmlFor={`user-${user._id}`}>{user.username}</label>
                  </li>
                ))}
              </ul>
              <button onClick={handleAddUserToGroup}>Add Users</button>
              <button onClick={handleAddUserClick}>Cancel</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );

              }
export default App;