import React from 'react';
import { IoSearch } from "react-icons/io5";

function Search() {
    return (
        <div className='mb-4'>
            <form action=''>
                <label className="input input-bordered flex items-center gap-2 my-2">
                    <input type="text" className="grow" placeholder="Search" />
                    <button >
                        <IoSearch className='hover:scale-110 h-5 w-5' />
                    </button>
                </label>
            </form>
        </div>
    )
}

export default Search;