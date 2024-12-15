import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Left from "./components/home/Left/Left";
import Right from "./components/home/Right/Right";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import { loginSuccess } from "./features/auth/authSlice";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch  = useDispatch();

  useEffect(() => {
    const checkLoggendIn = async () => {
        const response = await fetch("http://localhost:8080/user/checkUserLoggedIn/", {
          method: "GET",
          credentials: "include"
        });
        if(response.ok) {
          const data = await response.json();
          dispatch(loginSuccess(data));
        }
    }
    checkLoggendIn();
  }, []);

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={
              isAuthenticated ?
                <div className="flex min-h-screen">
                  <Left />
                  <Right />
                </div>
                : <Navigate to='/login' />
            } />
            <Route path="/login" element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
            <Route path="/signup" element={isAuthenticated ? <Navigate to='/' /> : <Signup />} />
            <Route path="*" element={<Navigate to='/' />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;