import "./App.css";
import IGroup from "../interface/Group";

import { useContext, useEffect, useState } from "react";
import { CreateGroup } from "../api/CreateGroup"; 
import { useFetchData } from "../api/FetchData";
import { addUserToGroup } from "../api/PostUserToGroup";

import { Appcontext } from '../Context';
import Iuser from "../interface/User";

function Home(): React.JSX.Element {
  const {fetchGroups,fetchUsers} = useFetchData();
  const [message,setmessage]= useState('');
  const {token,userId} = useContext(Appcontext);
  const [groups, setgroups] = useState<IGroup[]>([]);
  const [isaddingGroup, setisAddingGroup] = useState<boolean>(false);
  const [groupname, setgroupname] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [allUsers, setAllUsers] = useState<Iuser[]>([]);
  const [isAddingUsers, setIsAddingUsers] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  // const [groupid,setGroupid] = useState<string>('');
  // const [userid,setUserid] = useState<string>('');


  console.log("the token is ",token);

useEffect(() => {
const fetchGroupsandUsers = async () => {
const groupsfetchData = await fetchGroups();
const usersfetchData = await fetchUsers();

if (groupsfetchData){
setgroups(groupsfetchData);
setAllUsers(usersfetchData);
}
};
fetchGroupsandUsers();
}, [token]);

  const addgroups = async (event:any) => {
    console.log(token);
    event.preventDefault(); // This prevents the form from submitting traditionally

      if (token){
      const newGroup = await CreateGroup(groupname);
      console.log("Group added successfully");
      setgroups([...groups, newGroup]);
      setgroupname(""); // Reset input field after successful addition
      }
    } 

  const handlegroupckick = () => {
    setisAddingGroup((prevIsAddingGroup) => !prevIsAddingGroup);
  };

  const handleAddUserClick = () => {
    setIsAddingUsers(!isAddingUsers);
    setSelectedUsers([]);
  };
  const handleUserCheckboxchange = async (
    userId: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId)); // Remove user ID from selection
    }
  };

// const sendmessage = async() => {
// try {
  
//   if (!selectedGroup) {
//     console.error('No groupid detected');}

//     const response = await fetch('http://localhost:5000/createmessage',{
//     method: 'Post',
//     body: JSON.stringify({
//       groupId: selectedGroup,
//       createdBy: userId,
//       text: message
// }),
// })
// if(!response){
//     console.error('error sending message');}
// }
// catch(error){
// throw error;
// }
// }




  const handleAddUserToGroup = async () => {
    if (!selectedGroup || selectedUsers.length === 0) {
      alert("Please select a group and users to add.");
      return;
    }
    await addUserToGroup(selectedGroup, selectedUsers);

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
        <div className="sidebar">
  <button className="Addgroups" onClick={handlegroupckick}>
    +
  </button>
  {isaddingGroup && (
    <form onSubmit={addgroups}>
      <label className="groupname">
        Enter Groupname
        <input
          className="user-input-group"
          placeholder="entergroupname"
          type="text"
          value={groupname}
          onChange={(e) => setgroupname(e.target.value)}
        />
        <button className="sendbutton" type="submit"></button>
      </label>
    </form>
  )}
  <h2>Groups</h2>
  {groups.length > 0 ? (
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
  ) : (
    <p>No groups found. Create a new one!</p>
  )}
</div>
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
              {isAddingUsers ? "Close" : "Add Users"}{" "}
              {/* Toggle text based on state */}
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
                        handleUserCheckboxchange(
                          user._id.toString(),
                          !selectedUsers.includes(user._id.toString())
                        )
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
export default Home;
