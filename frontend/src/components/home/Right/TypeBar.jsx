import React from 'react';
import { MdSend } from "react-icons/md";

function TypeBar() {
    return (
        <div className='flex gap-3 h-[10vh] items-center mx-auto my-2 w-[80%]'>
            <input type="text" placeholder="Type here" className="input input-bordered w-full h-12" />
            <div className='bg-white h-12 w-12 rounded-lg flex items-center justify-center cursor-pointer'>
                <MdSend className='text-black h-6 w-6 hover:scale-110' />
            </div>
        </div>
    )
}

export default TypeBar;