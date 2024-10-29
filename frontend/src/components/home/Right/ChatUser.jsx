import React from 'react';

function ChatUser() {
    return (
        <div>
            <div className='flex gap-5 my-2 p-3 h-[10vh] rounded-xl cursor-pointer bg-slate-900 hover:bg-gray-900 duration-300'>
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div>
                <div className='font-bold'>John Smith</div>
                <div className='text-sm'>Online</div>
            </div>
            </div>
        </div>
    )
}

export default ChatUser;