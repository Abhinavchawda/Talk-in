import React from 'react';
import UserCard from './UserCard';

function Users() {
  return (
    <div className='overflow-y-auto h-[70vh] my-2'>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      <UserCard/>
      {/* <div className="avatar offline">
        <div className="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div> */}
    </div>
  )
}

export default Users;