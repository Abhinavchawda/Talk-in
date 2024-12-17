import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setMessages } from "./chatSlice";

export default function useSendMessages() {
    const dispatch = useDispatch();

    const messages = useSelector(state => state?.chat?.messages);
    const loading = useSelector(state => state?.chat?.loading);

    const selectedChatId = useSelector(state => state.chat?.selectedChatUser?._id);

    const sendMessages = async (message) => {
        dispatch(setLoading(true));
        if (selectedChatId && message && message.length > 0) {
            try {
                const response = await fetch(`http://localhost:8080/message/send/${selectedChatId}/`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "message": message })
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                dispatch(setMessages([...messages, data]));
            } catch (error) {
                console.error("ERROR in useSendMessages : ", error);
            } finally {
                dispatch(setLoading(false));
            }
        } 
        else {
            dispatch(setLoading(false));
        }
    };

    return { sendMessages, loading };
}