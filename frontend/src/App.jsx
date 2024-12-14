import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Left from "./components/home/Left/Left";
import Right from "./components/home/Right/Right";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
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