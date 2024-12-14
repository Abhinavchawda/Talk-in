import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

function Users() {
  const [users, setUsers] = useState([]);

  // const getAllUsers = async () => {
  //   const response = await fetch("http://localhost:8080/user/getAllUsersProfile/", {
  //     method: "GET"
  //   });
  //   const data = await response.json();
  //   setUsers(data);
  // }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/getAllUsersProfile/", {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        setUsers(data);        
      } 
      catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className='overflow-y-auto h-[65vh] my-2'>
      {users && users.map((u, index) => {
        return <UserCard key={index} userData={u} />;
      })}

      {/* <div className="avatar offline">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div> */}
    </div>
  )
}

export default Users;