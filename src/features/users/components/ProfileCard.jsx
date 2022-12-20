import classNames from 'classnames'
import React from 'react'

const ProfileCard = ({imgUrl, name, followers, className, onClick}) => {
  return (
    <div className='w-full flex gap-3 items-center'>
        <img onClick={onClick} className={classNames(className, 'w-14 aspect-square rounded-full object-cover cursor-pointer')} src={imgUrl} alt={name} />
        <div className="flex flex-col">
            <span onClick={onClick} className='cursor-pointer'>{name}</span>
            <span className='-mt-1 text-gray-400 text-sm'>{followers} followers</span>
        </div>
    </div>
  )
}

export default ProfileCard