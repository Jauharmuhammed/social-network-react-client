import classNames from 'classnames'
import React from 'react'

const ProfileCard = ({imgUrl, name, followers, className}) => {
  return (
    <div className='w-full flex gap-3 items-center'>
        <img className={classNames(className, 'w-16 aspect-square rounded-full object-cover')} src={imgUrl} alt={name} />
        <div className="flex flex-col">
            <span>{name}</span>
            <span className='-mt-1 text-gray-400 text-sm'>{followers} followers</span>
        </div>
    </div>
  )
}

export default ProfileCard