import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Left from "./components/home/Left/Left";
import Right from "./components/home/Right/Right";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";

function App() {

  return (
    <>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={
              <div className="flex min-h-screen">
                <Left />
                <Right />
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;