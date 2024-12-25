import React from 'react';
import ChatUser from '../../../features/chat/components/ChatUser';
import Messages from '../../../features/chat/components/Messages';
import TypeBar from '../../../features/chat/components/TypeBar';

const Right = () => {
  return (
    <div className='bg-slate-950 h-screen border border-black overflow-y-auto relative'>
      <ChatUser />

      <div className='mb-1 px-0.5 md:px-4'>
        <Messages />
      </div>

      <div className='sticky z-10 bottom-0'>
        <TypeBar />
      </div>
    </div>
  )
}

export default Right;