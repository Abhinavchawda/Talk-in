import React from 'react';
import { BiLogOut } from "react-icons/bi";

function Logout() {
    return (
        <div>
            <button>
                <BiLogOut className='h-10 w-10 my-3 p-1 bg-white z-5 text-black rounded-xl' />
            </button>
        </div>
    )
}

export default Logout;