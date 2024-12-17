import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: "false", 
    selectedChatUser: null,
    messages: []
};

const chatSlice = new createSlice({
    name: "chat",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSelectedChatUser(state, action) {
            state.selectedChatUser = action.payload;
        },
        setMessages(state, action) {
            state.messages = action.payload;
        }
    }
});


export const { setLoading, setSelectedChatUser, setMessages } = chatSlice.actions;
export default chatSlice.reducer;