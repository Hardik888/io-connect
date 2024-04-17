import "./App.css";
import IGroup from "../interface/Group";
import Iuser from "../interface/User";
import { useContext, useEffect, useState } from "react";
import { CreateGroup } from "../api/CreateGroup";
import { useFetchData } from "../api/FetchData";
import {addUserToGroup} from "../api/PostUserToGroup";
import { useSocket } from "../socketSetup/socketConn";
import { Appcontext } from "../Context";
import Imessage from "../interface/Message";
type messageType = {
  groupId: string,
  message: string,
  createdBy: string
}
type Message = string | Imessage;
function Home(): React.JSX.Element {

  const [messages, setMessages] = useState<Message[]>([]);

  const { socket, updateSocketId } = useSocket();
  const { fetchGroups, fetchUsers } = useFetchData();
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<messageType[]>([]);
  const { token, userId } = useContext(Appcontext);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [allUsers, setAllUsers] = useState<Iuser[]>([]);
  const [isAddingUsers, setIsAddingUsers] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchGroupsAndUsers = async () => {
      const groupsData = await fetchGroups();
      const usersData = await fetchUsers();
      if (groupsData && usersData) {
        setGroups(groupsData);
        setAllUsers(usersData);
      }
    };

    fetchGroupsAndUsers();
  }, [token]);

  // useEffect(() => {
  //   // Listen for new messages
  //   socket?.on("new_message", (data: any) => {
  //     if (data.groupId === selectedGroup) {
  //       setMessages((prevMessages) => [...prevMessages, data.message]);

  //       console.log(message);
  //     }
  //   });

  //   // Clean up listener on component unmount
  //   return () => {
  //     socket?.off("new_message");
  //   };
  // }, [socket, selectedGroup]);
  useEffect(() => {
    if (selectedGroup && socket) {
      socket.emit('join_group', selectedGroup);
      console.log(`Joined Group ${selectedGroup}`);
    }

    
  }, [socket, selectedGroup]);

//   useEffect(()=>{
//     const messageListener = (data: messageType) => {
//       if (data.groupId === selectedGroup) {
//         setReceivedMessage((prevMessages) => [...prevMessages, data]);
//         console.log(`New message in group ${data.groupId}: ${data.message}`);
//       }
//     };
//     socket?.on('new_message',messageListener);
// return() => {
//   socket?.off('new_message',messageListener);
// }
  
//   },[socket,selectedGroup]);

  const addGroups = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token && groupName) {
      const newGroup = await CreateGroup(groupName,token);
      if (newGroup) {
        setGroups((prev) => [...prev, newGroup]);
        setGroupName("");
      }
    }
  };

  const handleGroupClick = () => {
    setIsAddingGroup(!isAddingGroup);
  };

  const handleAddUserClick = () => {
    setIsAddingUsers(!isAddingUsers);
    setSelectedUsers([]);
  };

  const handleUserCheckboxChange = (userId: string, isChecked: boolean) => {
    setSelectedUsers((prev) =>
      isChecked ? [...prev, userId] : prev.filter((id) => id !== userId)
    );
  };

  const sendMessage = async () => {
    if (!selectedGroup || !message) {
      console.error("No GroupId or message detected", selectedGroup, message);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/messages/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          groupId: selectedGroup,
          createdBy: userId,
          text: message,
        }),
      });
      console.log(selectedGroup);
      console.log(userId);
      console.log(message);
      const payload = {
        groupId: selectedGroup,
        createdBy: userId,
        text:message
      }
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        socket?.emit('new_message',payload);
  console.log("success");
  setMessage("");} 
    } catch (error) {
      console.error("Catch error in sending message", error);
    }
  };
  // useEffect(()=>{
  //   try{
  //   if (socket){
  //   socket?.on('new_message',(data: { groupId: any; message: any; })=>{
  //     const {groupId,message}= data;
  //       console.log(`New message in group ${groupId}:${message}`);
  //       console.log('done')
  //   });
  // }}catch(error){
  //   console.error(error);
  // }
  // return ()=>{
  //   socket?.off('new_message');
  // } 
  // },[])
  useEffect(()=>{
    const messageListener = (message:any) => {
      console.log("Received new message:", message);  // Ensure this logs
      if (message.groupId === selectedGroup) {
          setReceivedMessage(prevMessages => [...prevMessages, message]);
      }
  };

  socket?.on('new_message', messageListener);
  return () => {
      socket?.off('new_message', messageListener);
  };
  },[sendMessage])
  const handleAddUserToGroup = async()=> {
    if (!selectedGroup || selectedUsers.length === 0) {
      alert("Please select a group and users to add.");
      return;
    }
    try {
      const result = await addUserToGroup(selectedGroup, userId,token);

      console.log("User added ", result);
      
if (result) {
        setSelectedUsers([]);
        setIsAddingUsers(false);
      }
    } catch (error) {
      console.error("failed to add user ", error);
    }
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
          <button className="Addgroups" onClick={handleGroupClick}>
            +
          </button>
          {isAddingGroup && (
            <form onSubmit={addGroups}>
              <label className="groupname">
                Enter Groupname
                <input
                  className="user-input-group"
                  placeholder="Enter group name"
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <button className="sendbutton" type="submit">
                  Add Group
                </button>
              </label>
            </form>
          )}
          <h2>Groups</h2>
          {groups.length > 0 ? (
            <ul>
              {groups.map((group) => (
                <li
                  key={group._id}
                  className={
                    selectedGroup === group._id ? "active" : "unactive"
                  }
                  onClick={() => setSelectedGroup(group._id)}
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
  {receivedMessage.map((msg, index) => (
    <div key={index}>
      <span>{msg.message}</span> - <b>{msg.createdBy}</b>
    </div>
  ))}
</div>
          <div className="user-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="attachment-button" onClick={handleAddUserClick}>
              {isAddingUsers ? "Close" : "Add Users"}
            </button>
            <button onClick={sendMessage}>Send</button>
          </div>
          {isAddingUsers && (
            <div className="add-users-container">
              <h3>Add Users to Group</h3>
              <ul>
                {allUsers.map((user) => (
                  <li key={user._id}>
                    <input
                      type="checkbox"
                      id={`user-${user._id}`}
                      checked={selectedUsers.includes(user._id.toString())}
                      onChange={() =>
                        handleUserCheckboxChange(
                          user._id.toString(),
                          !selectedUsers.includes(user._id)
                        )
                      }
                    />
                    <label htmlFor={`user-${user._id}`}>{user.username}</label>
                  </li>
                ))}
              </ul>
              <button className="sendbutton" onClick={handleAddUserToGroup}>
                Add Users
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Home;
