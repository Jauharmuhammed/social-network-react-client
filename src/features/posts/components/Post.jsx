import React from 'react'

const Post = ({imageUrl, title}) => {
  return (
      <div className='min-w-[150px] min-h-[150px] max-h-[500px] w-full h-fit mb-5 cursor-pointer'>
        <img className='w-full h-[95%] object-cover rounded-3xl' src={imageUrl} alt={title} /> 
        <p className='text-white p-2 font-medium text-ellipsis overflow-hidden ...'>{title}</p>
    </div>
  )
}

export default Post