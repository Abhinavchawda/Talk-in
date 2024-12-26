import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CreateGroup = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8080/user/getAllUsersProfile/", {
                    method: "GET",
                    credentials: "include"
                });
                const data = await response.json();
                setUsers(data);
            }
            catch (error) {
                console.error("Error fetching user profiles:", error);
            }
        };

        fetchUsers();
    }, []);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [groupForm, setGroupForm] = useState({ name: "", desc: "" });
    const [searchForm, setSearchForm] = useState("");

    const handleUserSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const userId = useSelector(state => state.auth.user?._id);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (groupForm.name == "") {
                alert("Group name is required!");
                return;
            }
            if (selectedUsers.length === 0) {
                alert("Please select at least one user!");
                return;
            }

            const bodyToSend = {
                name: groupForm.name,
                description: groupForm.desc,
                admin: [userId],
                members: selectedUsers,
            };

            await fetch("http://localhost:8080/group/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyToSend),
                credentials: "include"
            });
            setGroupName("");
            setSelectedUsers([]);
        }
        catch (error) {
            console.error("Error in create group", error);
        }
    };

    return (
        <div className="md:max-w-[40%] lg:max-w-[30%] p-2 lg:p-4 bg-black min-h-screen overflow-hidden">
            <h1 className='text-2xl text-white py-2 font-semibold'>Create Group</h1>
            <hr></hr>
            <form onSubmit={handleSubmit}>
                <div>
                    <div className="my-1">
                        <p className="font-semibold">Name:</p>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={groupForm.name}
                            onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })}
                            placeholder="Enter group name"
                            className="w-full bg-zinc-900 my-2 p-2 rounded-md focus:outline-none focus:ring focus:border-white"
                        />
                    </div>
                    <div className="my-1">
                        <p className="font-semibold">Description:</p>
                        <input
                            type="text"
                            name="desc"
                            id="desc"
                            value={groupForm.desc}
                            onChange={(e) => setGroupForm({ ...groupForm, desc: e.target.value })}
                            placeholder="Enter group description"
                            className="w-full bg-zinc-900 my-2 p-2 rounded-md focus:outline-none focus:ring focus:border-white"
                        />
                    </div>
                </div>

                <button type="submit" className="my-2 px-2 py-1 bg-blue-600 rounded-lg">Create Group</button>

                {/* Search Bar */}
                <form>
                    <div className="my-1">
                        <input
                            type="text"
                            name="search"
                            id="search"
                            value={searchForm}
                            onChange={(e) => setSearchForm(e.target.value)}
                            placeholder="Search Users"
                            className="w-full bg-zinc-900 my-2 p-2 rounded-md focus:outline-none focus:ring focus:border-white"
                        />
                    </div>
                </form>

                <div>
                    <ul>
                        {users && users
                            .filter((item) =>
                                item?.name?.trim().toLowerCase().includes(searchForm?.trim().toLowerCase())
                            )
                            .map((user, index) => (
                                <li key={index} className="hover:bg-zinc-700 hover:scale-[0.99] transition-all rounded-xl duration-300 my-2 px-4 flex items-center">
                                    <input
                                        type="checkbox"
                                        className="mr-2"
                                        checked={selectedUsers.includes(user._id)}
                                        onChange={() => handleUserSelect(user._id)}
                                    />
                                    <div className='flex gap-5 my-2 px-2 duration-300'>
                                        <div className="avatar">
                                            <div className="w-14 rounded-full">
                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                            </div>
                                        </div>
                                        <div className="text-wrap">
                                            <div className='font-bold'>{user.name}</div>
                                            <div>{user.email}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                    </ul>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;