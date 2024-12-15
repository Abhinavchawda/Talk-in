import React from 'react';
import { useSelector } from 'react-redux';

function MessageCard(props) {
    const messageData = props.message;

    const loggedInUserId = useSelector(state => state?.auth?.user?._id);
    
    return (
        <div>
            {(messageData?.senderId === loggedInUserId)
                ?
                <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">{messageData.message}</div>
                </div>
                :
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">{messageData.message}</div>
                </div>
            }
        </div>
    )
}

export default MessageCard;