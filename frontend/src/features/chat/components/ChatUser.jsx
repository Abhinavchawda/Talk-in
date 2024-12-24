import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatUser } from '../chatSlice';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function ChatUser() {
    const navigate = useNavigate();
    const selectedChatUser = useSelector(state => state?.chat?.selectedChatUser);

    const onlineUsers = useSelector(state => state.socket.onlineUsers);
    const isOnline = onlineUsers.includes(selectedChatUser._id);

    const dispatch = useDispatch();
    return (
        <div className='sticky top-0 z-10 flex items-center px-2 py-3 bg-slate-950 border-b'>
            <button className="mr-2 p-1 hover:bg-gray-800 rounded-full" onClick={() => dispatch(setSelectedChatUser(null))}>
                <IoArrowBack className="h-5 w-5 text-white" />
            </button>

            <div className='cursor-pointer flex items-center' onClick={() => navigate(`/user/profile/${selectedChatUser._id}`)}>
                <img
                    src={selectedChatUser?.image || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
                <div className="ml-3">
                    <h2 className="text-lg font-semibold">{selectedChatUser?.name || 'User Name'}</h2>
                    <p className="text-sm text-blue-400">{isOnline ? 'Online' : 'Offline'}</p>
                </div>
            </div>
        </div>
    )
}

export default ChatUser;