import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { _id } = useParams();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ about: "" });

    const isSameUser = useSelector((state) => state.auth.user?._id === _id);

    const GetUser = async () => {
        const response = await fetch("http://localhost:8080/user/profile/" + _id, {
            method: "GET",
            credentials: "include",
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data);
            setForm({ about: data.about || "" });
        }
    };

    useEffect(() => {
        GetUser();
    }, [_id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:8080/user/update-profile/" + _id, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });
            GetUser();
            setIsEditing(false);
        }
        catch (error) {
            setForm({ ...form, about: "error in update" });
            console.log("ERROR in update-profile ", error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto my-5 p-6 bg-gray-800 text-white rounded-xl shadow-md sm:p-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                <img
                    className="w-32 h-32 rounded-full border-4 border-gray-700 mx-auto sm:mx-0"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    alt="Profile"
                />
                <div className="text-center mt-4 sm:mt-0">
                    <h1 className="text-3xl font-bold">{user?.name || "Loading..."}</h1>
                    <p className="text-lg text-gray-400">{user?.email || "No email provided"}</p>
                </div>
                {isSameUser && (
                    <button
                        onClick={handleEditToggle}
                        className="mt-4 sm:mt-0 sm:ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        {isEditing ? "Cancel" : "Edit"}
                    </button>
                )}
            </div>

            {/* User Information */}
            <div className="mt-8 space-y-6">
                {/* Phone */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <label className="text-gray-400 text-sm sm:text-base">Phone</label>
                    <p className="text-lg font-medium text-left sm:text-right">
                        {user?.phone || "Not provided"}
                    </p>
                </div>

                {/* About */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <label className="text-gray-400 text-sm sm:text-base">About</label>
                    {!isEditing ? (
                        <p className="text-lg font-medium text-left sm:text-right">
                            {user?.about || "No description provided"}
                        </p>
                    ) : (
                        <input
                            type="text"
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            className="w-full sm:w-2/3 p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}
                </div>
            </div>

            {/* Save Button */}
            {isSameUser && isEditing && (
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-all"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;