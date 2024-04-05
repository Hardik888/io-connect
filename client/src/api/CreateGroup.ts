import IGroup from "../interface/Group";

export const CreateGroup = async (name: string): Promise<IGroup> => {
    try {
      const response = await fetch('http://localhost:5000/groups/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
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
  