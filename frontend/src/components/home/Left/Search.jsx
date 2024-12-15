import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setsearchString } from '../../../features/search/searchSlice';

function Search() {
    const dispatch = useDispatch();
    const [form, setForm] = useState("");

    const handleChange = (e) => {
        setForm(e.target.value);
        dispatch(setsearchString(e.target.value));      //updating the value of serachString
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className='mb-4'>
            <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <input 
                    type="text"
                    name='form'
                    value={form}
                    onChange={handleChange}
                    className="grow" placeholder="Search" />
                    <button >
                        <IoSearch className='hover:scale-110 h-5 w-5' />
                    </button>
                </label>
            </form>
        </div>
    )
}

export default Search;