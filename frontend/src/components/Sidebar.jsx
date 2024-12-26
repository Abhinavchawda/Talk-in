import React, { useState } from 'react';
import Logout from '../features/auth/components/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegStar } from "react-icons/fa";
import { PiDotsThreeOutlineVertical, PiPlusCircle } from "react-icons/pi";
import { RiRobot3Fill } from "react-icons/ri";

const Button = ({ children, onClick }) => {
    return (
        <button onClick={onClick}
            className="text-gray-400 hover:text-white hover:bg-gray-700 p-3 rounded-lg transition-colors duration-300"
        >
            {children}
        </button>
    );
}

export default function Sidebar() {
    const navigate = useNavigate();

    const [isclicked, setIsClicked] = useState(false);

    const user = useSelector(state => state.auth.user);
    return (
        <div className="relative bg-gray-900 text-white flex flex-col items-center justify-between min-h-screen w-[50px] lg:w-[70px] shadow-lg">
            {/* User Profile Section */}
            <div className="pt-4">
                <img
                    onClick={() => navigate(`/user/profile/${user._id}`)}
                    className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-gray-600 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Profile"
                />
            </div>

            {/* Navigation Icons */}

            {/* icon for AI */}
            <button className="absolute my-20 lg:my-24 mx-auto text-gray-400 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-300 text-xs" onClick={() => {
                navigate('/ai-chat')
            }}
            >
                <RiRobot3Fill size={16} />  
                ai
            </button>

            <div className="flex flex-col gap-3">
                <Button onClick={() => {
                    setIsClicked(!isclicked);
                }}>
                    <PiDotsThreeOutlineVertical className='mx-auto' />
                </Button>

                {isclicked &&
                    (<>
                        <Button onClick={() => {
                            navigate(`/message/label/${user._id}`);
                        }}
                        >
                            <FaRegStar className='mx-auto' />
                        </Button>
                        <Button onClick={() => {
                            navigate(`/group/create`);
                        }}
                        >
                            <PiPlusCircle className='mx-auto' />
                            <p className='text-xs'>group</p>
                        </Button>
                    </>)
                }
                <Button onClick={() => navigate('/')}>🏠</Button>
                <Button onClick={() => navigate(`/user/profile/${user._id}`)}>⚙️</Button>
            </div>

            {/* Logout Button */}
            <div className="mb-3">
                <div className="scale-[0.80] hover:scale-90 transform p-2 rounded-lg transition-transform duration-300">
                    <Logout />
                </div>
            </div>
        </div>
    );
}