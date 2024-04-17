import { createContext } from "react";

type AuthContextType = {
  token: string,
  userId: string,
}
export const fetchJwtToken = async(username:any,password:any) => {
    try {
        const response = await fetch('http://localhost:5000/LoginUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }), // Use the actual username and password state values
        });
        const {token,userId} = await response.json();
        return {token,userId};
      } catch (error) {
        console.error('Error during login:', error); // Log any errors that occur during the fetch
// Display a generic error message to the user
      }
}


export const Appcontext = createContext<AuthContextType>({token:' ',userId:' '});