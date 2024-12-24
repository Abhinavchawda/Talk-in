import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";
import useSocketCustom from "./features/socket/useSocketCustom";

import Left from "./components/home/Left/Left";
import Right from "./components/home/Right/Right";
import Signup from "./features/auth/components/Signup";
import Login from "./features/auth/components/Login";
import Sidebar from "./components/Sidebar";
import UserProfile from "./components/UserProfile";
import Protected from "./features/auth/Protected";

function App() {
  const dispatch = useDispatch();
  const { initializeSocket } = useSocketCustom();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const selectedChatUser = useSelector(state => state.chat.selectedChatUser);

  useEffect(() => {
    const checkLoggendIn = async () => {
      const response = await fetch("http://localhost:8080/user/checkUserLoggedIn/", {
        method: "GET",
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(loginSuccess(data));
      }
    }
    checkLoggendIn();
  }, []);

  useEffect(() => {
    initializeSocket(); // Run socket initialization, its a function imported from useSocket() (a custom hook)
  }, [initializeSocket]);

  return (
    <>
      <Router>
        <div className="flex font-nunito">
          <div><Protected><Sidebar /></Protected></div>

          <div className="min-h-screen bg-gray-900 text-white w-full">
            <Routes>
              <Route path="/" element={
                isAuthenticated ?
                  <div className="flex flex-col md:flex-row min-h-screen">
                    <div className="block md:hidden">
                      {selectedChatUser ? <Right /> : <Left />}
                    </div>
                    <div className="hidden md:flex w-full">
                      <div className="w-full md:w-[30%]">
                        <Left />
                      </div>

                      {selectedChatUser ?
                        <div className="w-full md:w-[70%] flex-1">
                          <Right />
                        </div>
                        :
                        <div className="text-xl flex justify-center items-center mx-auto">
                          Say, Hi and start conversation 😊
                        </div>
                      }
                    </div>
                  </div>
                  : <Navigate to='/login' />
              } />
              <Route path="/login" element={isAuthenticated ? <Navigate to='/' /> : <Login />} />
              <Route path="/signup" element={isAuthenticated ? <Navigate to='/' /> : <Signup />} />
              <Route path="/user/profile/:_id" element={<UserProfile />} />
              <Route path="*" element={<Navigate to='/' />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  )
}

export default App;