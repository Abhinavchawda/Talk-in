import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket(state, action) {
      state.socket = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    clearSocket(state) {
      state.socket = null;
      state.onlineUsers = [];
    },
  },
});

export const { setSocket, setOnlineUsers, clearSocket } = socketSlice.actions;

export const initializeSocket = (authUser) => (dispatch) => {
  if (authUser) {
    const socket = io("http://localhost:8080", {
      query: {
        userId: authUser.user._id,
      },
    });

    dispatch(setSocket(socket));

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.close();
      dispatch(clearSocket());
    };
  } 
  else {
    dispatch(clearSocket());
  }
};

export const selectSocket = (state) => state.socket.socket;
export const selectOnlineUsers = (state) => state.socket.onlineUsers;

export default socketSlice.reducer;