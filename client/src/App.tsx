
import './App.css';
import { FiUser } from 'react-icons/fi';
import { useEffect, useState} from 'react';
import { io, Socket } from 'socket.io-client'; 

interface IGroup {
  _id: string,
  name : string,
  users : string[],
  messages : string[],

}
interface Iuser {
  _id: number,
  username: string
}
function App() {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);
  const [groups,setgroups] = useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [allUsers, setAllUsers] = useState<Iuser[]>([]);
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
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

  useEffect(()=>{
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
        if (!userresponse.ok)
        {
          throw new Error('Failed to fetch users');
        }
        const Usersdata = await userresponse.json();
        console.log(Usersdata)
        setAllUsers(Usersdata);
     
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    
    fetchdata();
  },[])

  useEffect(() => {
    // Filter users belonging to the selected group
    if (selectedGroup) {
      const filteredUsers = groups.find(group => group._id === selectedGroup)?.users || [];
      setGroupUsers(filteredUsers);
    } else {
      setGroupUsers([]);
    }
  }, [selectedGroup, groups]);

  return (
    <div className="app-container">
      <header>
        <h1 className='app-heading'>CHAT NOW</h1>
      </header>
      <main className="chat-container">
      <div className="users-sidebar">
          <h3>All Users</h3>
          <ul>
            {allUsers.map(user => (
              <li key={user._id}>{user.username}</li>
            ))}
          </ul>
        </div>
        <div className="sidebar">
          
        <h2>Groups</h2>
<ul>
{groups.map(group => (
<li
key={group._id}
className={selectedGroup === group._id ? "active" : "unactive"}
onClick={() => {setSelectedGroup(group._id)
console.log(group._id);
}}>{group.name}</li>))}
</ul>
</div>

<div className="chat">
<div className="chat-header">
<h2 className='groupheader'>
{groups.find(group => group._id === selectedGroup)?.name}
</h2>
          </div>
          <div className="chat-messages">
            <div className="message">
              <FiUser className="profile-icon" />
              <div>
                <span className="sender">User:</span>
                <span className="text">Hello!</span>
                <span className="message-time">10:00 AM</span>
                <span className="message-status">✔️</span>
              </div>
            </div>
            <div className="message">
              <FiUser className="profile-icon" />
              <div>
                <span className="sender">User:</span>
                <span className="text">How are you?</span>
                <span className="message-time">10:01 AM</span>
                <span className="message-status">✔️</span>
              </div>
            </div>
            {/* Additional messages go here */}
          </div>
          <div className="user-input">
            <input type="text" placeholder="Type your message..." />
            <button className="attachment-button">Attachment</button>
            <button>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;