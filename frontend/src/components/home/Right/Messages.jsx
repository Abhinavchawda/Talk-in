import React, { useEffect, useRef } from 'react';
import MessageCard from './MessageCard';
import Loading from "../../Loading.jsx";
import useGetMessages from '../../../features/chat/useGetMessages.js';

function Messages() {
    const { messages, loading } = useGetMessages();

    const lastMessageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
        }, 100);
    }, [messages]) 
    return (
        <div style={{ minHeight: "calc(100vh - 30vh)" }} className='overflow-y-auto px-1'>
            {
                loading ? (<Loading />) :

                (messages.length > 0 && messages?.map((item, index) => {
                        return <MessageCard key={index} message={item} />;
                    })
                )
            }

            {!loading && messages.length === 0 &&
                <div className='text-white'>Say, Hi and start conversation</div>
            }
        </div>
    )
}

export default Messages;