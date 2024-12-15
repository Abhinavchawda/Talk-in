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
        if(form.message && form.message.length > 0) {
            try {
                console.log("Typed message: ", form?.message);
                await sendMessages(form?.message);
                setForm({ message: "" });
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className='bg-slate-900 rounded-xl bg-fixed'>
            <div className='flex gap-3 h-[10vh] items-center mx-auto mt-2 w-[80%]'>
                <input
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Type here"
                    className="input input-bordered w-full h-12 bg-slate-950" />

                <button type='submit' className='bg-white h-12 w-12 rounded-lg flex items-center justify-center cursor-pointer'>
                    <MdSend className='text-black h-6 w-6 hover:scale-110' />
                </button>
            </div>
        </form>
    )
}

export default TypeBar;