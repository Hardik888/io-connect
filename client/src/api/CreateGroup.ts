import IGroup from "../interface/Group";
import { Appcontext } from "../Context";
import { useContext } from "react";
export const CreateGroup = async (name: string): Promise<IGroup> => {
    const token = useContext(Appcontext);  
  try {
      const response = await fetch('http://localhost:5000/groups/create', {
        
      method: 'POST',
        
        headers: {
          'Authentication' : `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        }),
        
      });
  
      if (!response.ok) {
        console.error('Error adding group:', response.statusText);
        throw new Error('Failed to create group');
      }
  
      const createdGroup: IGroup = await response.json();
      return createdGroup;
    } catch (error) {
      console.error('Error adding group:', error);
      throw error;
    }
  };
  