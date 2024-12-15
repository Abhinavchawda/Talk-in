import React from 'react'

function Loading() {
    return (
        <div className='min-h-screen bg-zinc-800 flex justify-center items-center'>
            <div className="flex p-2 w-52 flex-col gap-4 scale-150">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}

export default Loading;