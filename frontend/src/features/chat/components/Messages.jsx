import React, { useEffect, useRef, useState } from 'react';
import MessageCard from './MessageCard.jsx';
import Loading from "../../../components/Loading.jsx";
import useGetMessages from '../useGetMessages.js';
import useGetSocketMessage from '../../socket/useGetSocketMessage.jsx';

function Messages() {
    
    const { messages: fetchedMessages, loading } = useGetMessages(); // Messages fetched initially
    const [messages, setMessages] = useState(fetchedMessages); // Local state for messages
    
    useGetSocketMessage();  //to get real-time messages
    
    const lastMessageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
        }, 100);
    }, [fetchedMessages]);

    // Update local messages state when fetchedMessages change
    useEffect(() => {
        setMessages(fetchedMessages);
    }, [fetchedMessages]);

    // Callback to handle message deletion
    const handleDeleteMessage = (messageId) => {
        setMessages((fetchedMessages) =>
            fetchedMessages.filter((message) => message._id !== messageId)
        );
    };

    return (
        <div style={{ minHeight: "calc(100vh - 20vh)" }} className='overflow-y-auto px-1'>
            {
                loading ? (<Loading />)
                    :
                    (messages.length > 0 && messages?.map((item, index) => {
                        return <div key={index} ref={lastMessageRef}><MessageCard onDelete={handleDeleteMessage} message={item} /></div>;
                    }))
            }

            {!loading && messages.length === 0 &&
                <div className='text-white'>Say, Hi and start conversation</div>
            }
        </div>
    )
}

export default Messages;