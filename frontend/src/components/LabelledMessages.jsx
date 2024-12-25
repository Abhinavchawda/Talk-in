// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const LabelledMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const userId = useSelector(state => state.auth?.user?._id);

//   const fetchLabelledMessages = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/message/label/' + userId, { credentials: "include" });
//       const data = await response.json();
//       setMessages(data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching labeled messages:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLabelledMessages();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-white">Loading...</p>;
//   }

//   if (messages.length === 0) {
//     return <p className="text-center text-white">No labeled messages found.</p>;
//   }

//   return (
//     <div className='min-h-screen md:w-[30%] bg-black p-4 text-white'>
//       <h1 className='text-xl text-white py-2 font-semibold'>Labelled Messages</h1>
//       <hr className='border-gray-700 mb-4' />

//       <ul>
//         {messages && messages.length > 0 ? (
//           messages.map((message) => (
//             <li key={message._id} className="message-card my-2 p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition duration-300">
//               <div className="flex justify-between items-center">
//                 <div className="flex items-center space-x-3">
//                   <p className="font-semibold">UserName</p>
//                   {message.isLabeled && (
//                     <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//                       Label
//                     </span>
//                   )}
//                 </div>
//                 <p className="text-gray-400 text-right text-sm">{new Date(message.createdAt).toLocaleString()}</p>
//               </div>

//               <p className="mt-3">{message.message}</p>

//               <div className="mt-2 text-right">
//                 <button 
//                   onClick={() => toggleLabel(message._id)} 
//                   className="text-blue-400 hover:text-blue-600 transition duration-200 text-sm"
//                 >
//                   Remove Label
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="text-center text-white">No labeled messages found.</p>
//         )}
//       </ul>
//     </div>
//   );

// };

// export default LabelledMessages;

import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const LabelledMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = useSelector(state => state.auth?.user?._id);

  const fetchLabelledMessages = async () => {
    try {
      const response = await fetch('http://localhost:8080/message/label/' + userId, { credentials: "include" });
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching labeled messages:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabelledMessages();
  }, []);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);   //create a new date object from the timestamp
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');    
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const toggleLabel = async (id) => {
    try {
      await fetch(`http://localhost:8080/message/update-label/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: "" }),
        credentials: "include",
      });
      fetchLabelledMessages();
    }
    catch (error) {
      console.error("Error updating label:", error);
    }
  };

  if (loading) {
    return <div className='min-h-screen md:w-[30%] bg-black p-4 text-white'>
      <p className="text-center text-white mt-20 text-2xl">Loading...</p>;
    </div>
  }

  return (
    <div className='min-h-screen md:w-[30%] bg-black p-4 text-white'>
      <h1 className='text-xl text-white py-2 font-semibold'>Labelled Messages</h1>
      <hr className='border-gray-700 mb-4' />
      {
        messages.length === 0 && <p className="text-center text-white">No labeled messages found.</p>
      }
      <ul>
        {messages && messages.map((message) => (
          <li key={message._id} className={`my-2 p-2 px-3 ${message.senderId === userId ? 
            'bg-blue-800' : 
            'bg-zinc-900'
          } rounded-lg hover:bg-zinc-800 transition duration-300`} >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* Display receiver's name */}
                {
                  message.isGroupMessage ?
                    <p className="font-semibold text-lg">{message.groupName}</p>
                    :
                    <p className="font-semibold text-lg">{message.receiverId[0].name}</p>
                }
                {message.isLabeled && (
                  <span className="bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Label
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-right text-sm">{new Date(message.createdAt).toLocaleString()}</p>
            </div>

            <p className="mt-3">{message.message}</p>

            <div className="mt-2 text-right flex items-center justify-end gap-2">
              <p className="text-gray-400 text-right text-xs">{formatTime(message.createdAt)}</p>
              <button
                onClick={() => toggleLabel(message._id)}
                className="text-blue-400 hover:text-blue-600 transition duration-200 text-sm"
              >
                <FaStar className="text-white" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelledMessages;