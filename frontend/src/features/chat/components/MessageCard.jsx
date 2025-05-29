import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaStar, FaRegStar } from 'react-icons/fa';

function MessageCard(props) {
    const messageData = props.message;

    const loggedInUserId = useSelector(state => state?.auth?.user?._id);

    // Initialize state for the label (star or empty)
    const [label, setLabel] = useState(messageData.label || ""); // Default to empty if no label
    
    let holdTimeout; // Timeout for tap & hold to delete

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

    // Delete message function
    const deleteMessage = async () => {
        try {
            const response = await fetch(`http://localhost:8080/message/delete/${messageData._id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (response.ok) {
                props.onDelete(messageData._id); // Inform parent to update UI
            } else {
                console.error("Failed to delete message");
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    // Handle right-click to delete (desktop)
    const handleRightClick = (event) => {
        event.preventDefault(); // Prevent the default context menu
        if (messageData.senderId === loggedInUserId) {
            if (window.confirm("Do you want to delete this message?")) {
                deleteMessage();
            }
        }
    };
    
    // Handle tap & hold to delete (mobile)
    const handleTouchStart = () => {
        if (messageData.senderId === loggedInUserId) {
            holdTimeout = setTimeout(() => {
                if (window.confirm("Do you want to delete this message?")) {
                    deleteMessage();
                }
            }, 500); // 0.5-second hold
        }
    };
    const handleTouchEnd = () => {
        clearTimeout(holdTimeout); // Cancel if user releases before 0.5 seconds
    };

    return (
        <div
            onContextMenu={handleRightClick} // Right-click for desktop
            onTouchStart={handleTouchStart} // Start detecting touch for mobile
            onTouchEnd={handleTouchEnd} // End touch detection
        >
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