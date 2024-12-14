import React from 'react';
import { BiLogOut } from "react-icons/bi";

const logoutFunc = async (e) => {
    e.preventDefault();

    const response = await fetch("", {
        method: "POST", 
        headers: {
            
        },
        body: JSON.stringify()
    });
    const data = await response.json();
}

function Logout() {
    return (
        <div>
            <button onClick={e => logoutFunc(e)}>
                <BiLogOut className='h-10 w-10 my-3 p-1 bg-white z-5 text-black rounded-xl' />
            </button>
        </div>
    )
}

export default Logout;