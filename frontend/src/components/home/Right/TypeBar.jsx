import React, { useState } from 'react';
import { MdSend } from "react-icons/md";
import useSendMessages from '../../../features/chat/useSendMessages.js';

function TypeBar() {
    const { loading, sendMessages } = useSendMessages();

    const [form, setForm] = useState({ "message": "" });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.message && form.message.length > 0) {
            try {
                await sendMessages(form?.message);
                setForm({ message: "" });
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center px-4 py-3 bg-slate-950 border-t border-darkblue-700/50 nset-0 backdrop-blur-md">
                <input
                    type="text"
                    name='message'
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-lg focus:outline-none"
                />
                <button type='submit' className='bg-slate-900 px-4 py-3 rounded-lg flex items-center justify-center cursor-pointer transition mx-3'>
                    <MdSend className='h-6 w-6 hover:scale-110' />
                </button>
            </div>
        </form>
    )
}

export default TypeBar;