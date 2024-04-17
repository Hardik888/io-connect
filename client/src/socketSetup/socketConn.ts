import { useEffect, useState, useCallback } from "react";
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
    
    const [socket, setSocket] = useState<Socket<any, any> | null>(null);

    // Initialize socket connection
    useEffect(() => {

        const newSocket = io("http://localhost:5000", { withCredentials: true });
      
        setSocket(newSocket);
      
        console.log("Socket initialized");
      
        return () => {
            newSocket.disconnect();
            console.log("Socket disconnected");
        };}, []);
    // Function to emit the updated socket ID
    const updateSocketId = useCallback((userId:string) => {
    
      if (socket) {

            socket.emit('updatedSocketId', userId);
            
            console.log("Socket ID updated for user:", userId);
        }
    }, [socket]);

    return { socket, updateSocketId };
};
