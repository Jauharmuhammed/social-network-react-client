import React from 'react'

const Error404 = ({text}) => {
  return (
    <>
    {text &&<div className='bg-transparent text-6xl text-gray-200 flex justify-center items-center min-h-screen fixed inset-0'>{text}</div>}
    {!text && <div className='bg-darkgray text-9xl text-gray-200 flex justify-center items-center min-h-screen fixed inset-0'>404</div>}
    </>
  )
}

export default Error404