import React from 'react';
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from 'react-redux';

import { useNavigate } from "react-router-dom";
import { logout } from '../authSlice';


function Logout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutFunc = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/user/logout/", {
            method: "POST",
            credentials: "include"
        })
            .then(resp => {
                dispatch(logout());
                if (resp.ok) {
                    navigate('/login');
                }
            })
            .catch(error => console.error('Logout failed', error));

        const data = await response.json();
    }
    return (
        <div>
            <button onClick={e => logoutFunc(e)}>
                <BiLogOut className='h-10 w-10 my-3 p-1 bg-white z-5 text-black rounded-xl' />
            </button>
        </div>
    )
}

export default Logout;