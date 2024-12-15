import React from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeBar from './TypeBar';

const Right = () => {
  return (
    <div className='bg-slate-950 w-[70%] h-screen border border-black p-4 overflow-y-auto'>
      <div className='fixed top-0 z-10 w-full'>
        <ChatUser />
      </div>

      <div className='mb-1'> 
        <Messages />
      </div>

      <div className='fixed bottom-0 w-[70%]'>
        <TypeBar />
      </div>
    </div>
  )
}

export default Right;