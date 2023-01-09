import React from 'react'

const ProfileCard = ({user, onClick}) => {
  return (
    <div onClick={onClick} className='flex gap-5 py-2 cursor-pointer'>
        <img className='w-12 h-12 aspect-square rounded-full object-cover' src={user.profile_pic} alt={user.full_name} />
        <div className="flex flex-col ">
            <span>{user.full_name}</span>
            <span className='text-gray-400 text-sm'>{user.username}</span>
        </div>
    </div>
  )
}

export default ProfileCard