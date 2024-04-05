import "../App.css";
import IGroup from "../interface/Group";
import Iuser from "../interface/User";
import { socketConn } from "../socketSetup/socketConn";
import { useEffect, useState } from "react";
import { CreateGroup } from "../api/CreateGroup"; 
import { fetchdata } from "../api/FetchData";
import { addUserToGroup } from "../api/PostUserToGroup";
function Home() {

  const [groups, setgroups] = useState<IGroup[]>([]);
  const [isaddingGroup, setisAddingGroup] = useState<boolean>(false);
  const [groupname, setgroupname] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [allUsers, setAllUsers] = useState<Iuser[]>([]);
  const [isAddingUsers, setIsAddingUsers] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const socket = socketConn();useEffect(()=>{},[socket])  

  useEffect(() => {
    const fetchGroupsandUsers = async () => {
      const { groupsfetchData, usersfetchData } = (await fetchdata()) as {
        groupsfetchData: any;
        usersfetchData: any;
      };
      setgroups(groupsfetchData);
      setAllUsers(usersfetchData);
    };
    fetchGroupsandUsers();
  }, []);

  const addgroups = async () => {
    try {
      const newGroup = await CreateGroup(groupname);
      console.log("Group added successfully");
      setgroups([...groups, newGroup]);
    } catch (error) {
      console.error("Error adding group", error);
    }
  };

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
        {groups.length > 0 ? (
          <div className="sidebar">
            <button className="Addgroups" onClick={handlegroupckick}>
              +
            </button>
            {isaddingGroup && (
              <form>
                <label className="groupname">
                  Enter Groupname
                  <input
                    className="user-input-group"
                    placeholder="entergroupname"
                    type="text"
                    value={groupname}
                    onChange={(e) => setgroupname(e.target.value)}
                  />
                  <button className="sendbutton" onClick={addgroups}></button>
                </label>
              </form>
            )}
            <h2>Groups</h2>
            <ul>
              {groups.map((group) => (
                <li
                  key={group._id}
                  className={
                    selectedGroup === group._id ? "active" : "unactive"
                  }
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
