import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatReducer from "../features/chat/chatSlice";
import socketReducer from "../features/socket/socketSlice";
import searchReducer from "../features/search/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    socket: socketReducer,
    search: searchReducer
  },
});

export default store;