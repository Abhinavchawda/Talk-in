import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Profile Header */}
            <div className="flex items-center space-x-6">
                <img
                    className="w-24 h-24 rounded-full border-4 border-gray-300"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Profile"
                />
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                    <p className="text-lg text-gray-300">{user?.email}</p>
                </div>
            </div>

            {/* User Information */}
            <div className="mt-8 space-y-6">
                <div className="flex justify-between items-center">
                    <label className="text-gray-700">Phone</label>
                    {/* <input
                        type="text"
                        value={user.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-2/3 p-2 rounded-md border border-gray-300"
                    /> */}
                </div>

                <div className="flex justify-between items-center">
                    <label className="text-gray-700">Address</label>
                    {/* <input
                        type="text"
                        value={user.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-2/3 p-2 rounded-md border border-gray-300"
                    /> */}
                </div>
            </div>

            {/* Edit Button */}
            <div className="mt-8 flex justify-end">
                <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default UserProfile;