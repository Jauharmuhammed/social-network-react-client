import React from 'react'

const Post = (props) => {
    // imageUrl, title, profile, square, landscape, portrait, mobile
  return (
    <div className='min-w-[150px] min-h-[150px] max-h-[500px] w-full h-fit mb-5'>
        <img className='w-full h-[95%] object-cover rounded-3xl' src={props.imageUrl} alt={props.title} /> 
        {/* <p className='text-white p-2 font-medium text-ellipsis overflow-hidden ...'>{props.title}</p> */}
    </div>
  )
}

export default Post