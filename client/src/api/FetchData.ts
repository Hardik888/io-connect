import { useContext } from "react";
import { Appcontext } from "../Context";

// Create a custom hook that uses other hooks appropriately
export const useFetchData = () => {
  const { token } = useContext(Appcontext);

  // Function to fetch groups
  const fetchGroups = async () => {
    const response = await fetch('http://localhost:5000/getAllGroups', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }
    return response.json();
  };

  // Function to fetch users
  const fetchUsers = async () => {
    const response = await fetch('http://localhost:5000/getusers', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    return response.json();
  };

  return { fetchGroups, fetchUsers };
};
