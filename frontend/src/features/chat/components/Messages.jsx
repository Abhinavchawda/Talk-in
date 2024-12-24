import React, { useEffect, useRef } from 'react';
import MessageCard from './MessageCard.jsx';
import Loading from "../../../components/Loading.jsx";
import useGetMessages from '../useGetMessages.js';
import useGetSocketMessage from '../../socket/useGetSocketMessage.jsx';

function Messages() {
    
    const { messages, loading } = useGetMessages();
    
    useGetSocketMessage();  //to get real-time messages
    
    const lastMessageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth"});
        }, 100);
    }, [messages]);


    return (
        <div style={{ minHeight: "calc(100vh - 20vh)" }} className='overflow-y-auto px-1'>
            {
                loading ? (<Loading />)
                    :
                    (messages.length > 0 && messages?.map((item, index) => {
                        return <div key={index} ref={lastMessageRef}><MessageCard message={item} /></div>;
                    }))
            }

            {!loading && messages.length === 0 &&
                <div className='text-white'>Say, Hi and start conversation</div>
            }
        </div>
    )
}

export default Messages;