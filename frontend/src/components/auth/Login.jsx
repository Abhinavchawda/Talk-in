import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: "", password: "" });

    const loginFunc = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/user/login/", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", // Telling the server to expect JSON
            },
            credentials: "include",
            body: JSON.stringify(form) // The body must be a string
        });
        const data = await response.json();        
        console.log("data : ", data);
        
        dispatch(loginSuccess(data));

        setForm({ email: "", password: "" });
        navigate("/");
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={e => loginFunc(e)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={form.password}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 bg-indigo-500 rounded text-white font-semibold hover:bg-indigo-600 transition"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-indigo-400 hover:underline">
                        Signup
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;