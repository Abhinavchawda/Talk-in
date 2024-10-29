import React from 'react';

function UserCard() {
  return (
    <div>
      <div className='flex gap-5 my-2 p-4 rounded-lg hover:bg-gray-900 duration-300 cursor-pointer'>
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <div className='font-bold'>Jethalal</div>
          <div>jetha@gmail.com</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;