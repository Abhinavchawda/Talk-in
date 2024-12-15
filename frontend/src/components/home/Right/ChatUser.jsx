import React from 'react';
import { useSelector } from 'react-redux';

function ChatUser() {
    const selectedChatUser = useSelector(state => state?.chat?.selectedChatUser);

    return (
        <div className='fixed z-10 w-full'>
            <div className='flex gap-5 mb-2 p-3 h-[10vh] rounded-xl cursor-pointer bg-slate-900 hover:bg-gray-900 duration-300'>
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <div className='font-bold'>{selectedChatUser?.name}</div>
                <div className='text-sm'>Online</div>
            </div>
            </div>
        </div>
    )
}

export default ChatUser;