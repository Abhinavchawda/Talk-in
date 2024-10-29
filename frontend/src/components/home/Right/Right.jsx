import React from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeBar from './TypeBar';

const Right = () => {
  return (
    <div className='bg-slate-950 w-[70%] h-screen border border-black p-4 overflow-y-auto'>   
      <ChatUser />

      <Messages />

      <TypeBar />
    </div>
  )
}

export default Right;