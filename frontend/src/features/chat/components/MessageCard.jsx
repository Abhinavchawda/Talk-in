import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStar, FaRegStar } from 'react-icons/fa';

function MessageCard(props) {
    const messageData = props.message;

    const loggedInUserId = useSelector(state => state?.auth?.user?._id);

    // Initialize state for the label (star or empty)
    const [label, setLabel] = useState(messageData.label || ""); // Default to empty if no label

    // Function to format the createdAt time
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);   //create a new date object from the timestamp
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');      //padStart method in this line is used to format the minutes value so that it always has at least 2 characters by adding a padding character ('0') to the beginning of the string if necessary.
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12; // Convert to 12-hour format
        return {
            date: date.getDate(),
            time: `${formattedHours}:${minutes} ${ampm}`
        };
    };

    // Toggle the label between "star" and ""
    const toggleLabel = async () => {
        const newLabel = label === "star" ? "" : "star";
        setLabel(newLabel);
        try {
            await fetch(`http://localhost:8080/message/update-label/${messageData._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ label: newLabel }),
                credentials: "include",
            });
        }
        catch (error) {
            console.error("Error updating label:", error);
        }
    };

    return (
        <div>
            {(messageData?.senderId === loggedInUserId)
                ?
                <div className="chat chat-end  ml-10 md:ml-28">
                    <div className="chat-bubble chat-bubble-info">
                        {messageData.message}
                        <div className="text-xs flex gap-2 justify-end items-center text-black">
                            <div className="cursor-pointer" onClick={toggleLabel}>
                                {label === "star" ? <FaStar size={10} /> : <FaRegStar size={10} />}
                            </div>
                            {formatTime(messageData.createdAt).time}
                        </div>
                    </div>
                </div>
                :
                <div className="chat chat-start mr-10 md:mr-28">
                    <div className="chat-bubble chat-bubble-accent">
                        {messageData.message}
                        <div className="text-xs flex gap-2 justify-end items-center text-black">
                            <div className="cursor-pointer" onClick={toggleLabel}>
                                {label === "star" ? <FaStar size={10} /> : <FaRegStar size={10} />}
                            </div>
                            {formatTime(messageData.createdAt).time}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default MessageCard;