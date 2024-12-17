
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMessages } from "./chatSlice.js";

export default function useGetMessages() {
    const dispatch = useDispatch();
    const messages = useSelector(state => state?.chat?.messages);
    const loading = useSelector(state => state?.chat?.loading);
    
    const selectedChatId = useSelector(state => state.chat?.selectedChatUser?._id);
    
    useEffect(() => {
        const getMessages = async () => {
            dispatch(setLoading(true));
            if (selectedChatId) {
                try {
                    const response = await fetch(`http://localhost:8080/message/get/${selectedChatId}/`, {
                        method: "GET",
                        credentials: "include"
                    });
                    const data = await response.json();

                    dispatch(setMessages(data));
                    dispatch(setLoading(false));
                }
                catch (error) {
                    console.log("ERROR in .js in getMessages()", error);
                }
            }
        }

        getMessages();
    }, [selectedChatId, setMessages]);

    return { messages, loading };
}