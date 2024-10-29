import React from 'react';
import Search from './Search';
import Users from './Users';
import Logout from './Logout';

function Left() {
  return (
    <div className='w-[30%] bg-black p-4 text-white'>
      <h1 className='text-2xl text-white py-2 font-semibold'>Chats</h1>
      <Search/>
      <hr/>
      <Users/>

      <Logout/>
    </div>
  )
}

export default Left;