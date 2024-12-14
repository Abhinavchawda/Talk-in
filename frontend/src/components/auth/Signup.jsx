import React, { useState } from "react";

const Signup = () => {

    const [form, setForm] = useState({ "name": "", "email": "", "password": "", "confirmPassword": "" });

    const singupFunc = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8080/user/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Telling the server to expect JSON
            },
            credentials: "include",
            body: JSON.stringify(form)
        });
        const data = await response.json();
        
        // setForm({ "name": "", "email": "", "password": "", "confirmPassword": "" });
        setForm({});
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={e =>singupFunc(e)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-indigo-500 rounded text-white font-semibold hover:bg-indigo-600 transition"
          >
            Signup
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;