import React from 'react';
import Logout from './home/Left/Logout';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    
    const user = useSelector(state => state.auth.user);
    return (
        <div className="bg-gray-900 text-white flex flex-col items-center justify-between min-h-screen w-[50px] lg:w-[75px] shadow-lg">
            {/* User Profile Section */}
            <div className="pt-4">
                <img
                    onClick={() => navigate(`/user/profile/${user._id}`)}
                    className="w-10 h-10 lg:w-16 lg:h-16 rounded-full border-2 border-gray-600 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="User Profile"
                />
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col gap-6">
                <Button onClick={() => navigate('/')}>🏠</Button>
                <Button onClick={() => navigate('/chat')}>💬</Button>
                <Button onClick={() => navigate(`/user/profile/${user._id}`)}>⚙️</Button>
            </div>

            {/* Logout Button */}
            <div className="mb-4">
                <div className="hover:scale-110 transform p-3 rounded-lg transition-transform duration-300">
                    <Logout />
                </div>
            </div>
        </div>
    );
}