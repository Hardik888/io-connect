import { useEffect ,useState } from "react";
import {io,Socket} from 'socket.io-client';

export const socketConn =() => {
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
        socket.on("connect", () => {
          console.log("Socket connected, ID:", socket.id);
        });
  
        return () => {
          socket.off("connect");
        };
      }
    }, [socket]);
  
    return socket;
  
}