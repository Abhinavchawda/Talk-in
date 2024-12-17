import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!form.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {    //regex validation
            newErrors.email = "Please enter a valid email address";
        }

        if (!form.password) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        return newErrors;   //returns an object names newErrors
    };

    const loginFunc = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) { //checks for atleast on error by checking the keys of the returned object like "email", "password"
            setErrors(validationErrors);
            return;
        }

        const response = await fetch("http://localhost:8080/user/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Telling the server to expect JSON
            },
            credentials: "include",
            body: JSON.stringify(form) // The body must be a string
        });

        if (!response.ok) {
            setErrors({ ...errors, "backendError": response.statusText });
            return;
        }
        const data = await response.json();
        dispatch(loginSuccess(data));

        setForm({ email: "", password: "" });
        navigate("/");
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="text-4xl font-extrabold text-center mb-4">Welcome to Talk-in</h1>
                <p className="text-center text-sm text-gray-400 mb-4">
                    The ultimate platform to connect, share, and chat effortlessly. Start your
                    conversation by logging in or signing up now!
                </p>
                <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

                <form onSubmit={loginFunc} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={form.email}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                                className={`w-full p-3 rounded bg-gray-700 text-white border ${errors.password ? "border-red-500" : "border-gray-600"} focus:outline-none focus:ring focus:ring-blue-500`}
                                placeholder="Enter your password"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button type="submit" className="w-full p-3 bg-blue-600 rounded text-white font-semibold hover:bg-blue-700 transition">
                        Login
                    </button>
                    {errors.backendError && <p className="text-red-500 text-sm mt-1">{errors.backendError}</p>}
                </form>
                
                <p className="mt-4 text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-400 hover:underline">Signup</a>
                </p>
            </div>
        </div>
    );
};

export default Login;