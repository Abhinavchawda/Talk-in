import React from 'react';
import ChatUser from './ChatUser';
import Messages from './Messages';
import TypeBar from './TypeBar';

const Right = () => {
  return (
    <div className='bg-slate-950 h-screen border border-black overflow-y-auto relative'>
      <ChatUser />

      <div className='mb-1 px-4'>
        <Messages />
      </div>

      <div className='sticky z-10 bottom-0'>
        <TypeBar />
      </div>
    </div>
  )
}

export default Right;