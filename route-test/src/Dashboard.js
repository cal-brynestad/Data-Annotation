import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Mock function to simulate fetching user data
const fetchUserDataMock = async (userId) => {
    // Simulate an asynchronous request
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulated user data
        const mockUserData = {
          id: userId,
          name: 'John Doe',
          email: 'john.doe@example.com',
          // ... other user details
        };
        resolve(mockUserData);
      }, 1000); // Simulate a 1-second delay
    });
  };
  

function Dashboard() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserDataMock(id); 
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default Dashboard;