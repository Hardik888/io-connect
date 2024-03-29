
import './App.css';
import { FiUser } from 'react-icons/fi';
import { useEffect, useState} from 'react';
import { io, Socket } from 'socket.io-client'; 

function App() {
  const [socket, setSocket] = useState<Socket<any, any> | null>(null);

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

  return (
    <div className="app-container">
      <header>
        <h1 className='app-heading'>CHAT NOW</h1>
      </header>
      <main className="chat-container">
        <div className="sidebar">
          <h2>Groups</h2>
          <ul>
            <li className="active">General</li>
            <li>Random</li>
          </ul>
        </div>
        <div className="chat">
          <div className="chat-header">
            <h2 className='groupheader'>General</h2>
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
