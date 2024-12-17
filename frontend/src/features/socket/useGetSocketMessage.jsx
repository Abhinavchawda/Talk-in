import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../chat/chatSlice';
import { getSocket } from './useSocketCustom';

function useGetSocketMessage() {
    const dispatch = useDispatch();

    const socket = getSocket();
    const messages = useSelector(state => state.chat.messages);
    
    useEffect(() => {        
        socket.on("newMessage", (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        });

        return () => {
            socket.off("newMessage");
        };
    }, [socket, messages, setMessages]);
}

export default useGetSocketMessage;