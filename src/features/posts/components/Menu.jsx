import React from 'react'

const Menu = () => {

  return (
    <div className='absolute -translate-x-1/2 bottom-0 rounded-3xl p-3 bg-darkgray text-gray w-56 '>
        <ul className='flex flex-col shadow-2xl gap-2 list-none'>
            <li>Download Image</li>
            <li>Report Post</li>
            <li>Report User</li>
            <li>Edit post</li>
            <li>Delete post</li>
        </ul>
    </div>
  )
}

export default Menu