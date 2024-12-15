import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedChatUser } from '../../../features/chat/chatSlice.js';

function UserCard(props) {
  const dispatch = useDispatch();

  const userData = props.userData;

  const selectedChatId = useSelector(state => state.chat?.selectedChatUser?._id);

  const isSelected = selectedChatId === userData?._id;

  return (
    <div className={`hover:bg-slate-600 duration-300 ${isSelected ? 'bg-slate-700' : ''} `}
      onClick={e => { 
        dispatch(setSelectedChatUser(userData)); 
      }}
    >
      <div className='flex gap-5 my-2 p-4 hover:bg-gray-900 duration-300 cursor-pointer'>
        <div className="avatar online">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <div className='font-bold'>{userData.name}</div>
          <div>{userData.email}</div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;