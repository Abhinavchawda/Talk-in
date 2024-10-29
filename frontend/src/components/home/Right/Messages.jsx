import React from 'react';
import MessageCard from './MessageCard';

function Messages() {
    return (
        <div style={{minHeight: "calc(100vh - 30vh)"}} className='overflow-y-auto'>
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            {/* <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard />
            <MessageCard /> */}
        </div>
    )
}

export default Messages;