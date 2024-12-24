import React from 'react';
import { useSelector } from 'react-redux';

function MessageCard(props) {
    const messageData = props.message;

    const loggedInUserId = useSelector(state => state?.auth?.user?._id);

    // Function to format the createdAt time
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);   //create a new date object from the timestamp
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');      //padStart method in this line is used to format the minutes value so that it always has at least 2 characters by adding a padding character ('0') to the beginning of the string if necessary.
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return (
        <div>
            {(messageData?.senderId === loggedInUserId)
                ?
                <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-info">
                        {messageData.message}
                        <div className="text-xs text-black">{formatTime(messageData.createdAt)}</div>
                    </div>
                </div>
                :
                <div className="chat chat-start">
                    <div className="chat-bubble chat-bubble-accent">
                        {messageData.message}
                        <div className="text-xs text-black">{formatTime(messageData.createdAt)}</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MessageCard;