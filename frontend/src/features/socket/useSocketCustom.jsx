import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOnlineUsers } from './socketSlice';
import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    return socket;
}

function useSocketCustom() {
    const dispatch = useDispatch();

    const loggedInUser = useSelector((state) => state.auth.user);

    const initializeSocket = () => {
        if (!socket && loggedInUser) {
            socket = io("http://localhost:8080", {
                query: { userId: loggedInUser._id },
            });

            socket.on("getOnlineUsers", (users) => {
                dispatch(setOnlineUsers(users));
            });

            socket.on("error", (err) => {
                console.error("Socket connection error:", err);
            });

            // Clean up socket
            return () => {
                socket.close();
            };
        }
    };

    useEffect(() => {
        initializeSocket();
    }, [loggedInUser]);

    return { initializeSocket, getSocket };
}

export default useSocketCustom;