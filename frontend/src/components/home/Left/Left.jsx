import React from 'react';
import Search from './Search';
import Users from './Users';

function Left() {
  return (
    <div className='min-h-screen bg-black p-4 text-white'>
      <h1 className='text-2xl text-white py-2 font-semibold'>Chats</h1>
      <Search/>
      <hr/>
      <Users/>
    </div>
  )
}

export default Left;