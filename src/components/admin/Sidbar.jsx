import React from 'react'
import { Link } from 'react-router-dom'

const Sidbar = () => {
    const icons = {
        className:'p-3 rounded hover:bg-[#303030] cursor-pointer transition-all duration-300'
    }
  return (
    <div className='flex flex-col items-center bg-[#141414] py-10 px-3 gap-3 min-h-screen w-20 text-white'>
        <Link {...icons} title='Dashboard' to='/admin' >
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M80 212v236a16 16 0 0 0 16 16h96V328a24 24 0 0 1 24-24h80a24 24 0 0 1 24 24v136h96a16 16 0 0 0 16-16V212"/><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"/></svg>
        </Link>
        <Link {...icons} title='User management' to='/admin/user-management'>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><circle cx="88" cy="108" r="52" fill="currentColor" opacity=".2"/><path fill="currentColor" d="M121.2 157.9a60 60 0 1 0-66.4 0a95.5 95.5 0 0 0-45.3 34.9a8 8 0 1 0 13 9.2a80.1 80.1 0 0 1 131 0a8 8 0 1 0 13-9.2a95.5 95.5 0 0 0-45.3-34.9ZM44 108a44 44 0 1 1 44 44a44 44 0 0 1-44-44Z"/><path fill="currentColor" d="M248.1 192.8a96.3 96.3 0 0 0-45.4-34.9A59.9 59.9 0 0 0 169.5 48a64 64 0 0 0-16.3 2.2a8.1 8.1 0 0 0-5.5 9.9a8 8 0 0 0 9.9 5.5a47.4 47.4 0 0 1 11.9-1.6a44 44 0 0 1 0 88a8 8 0 0 0 0 16a80.2 80.2 0 0 1 65.5 34a7.9 7.9 0 0 0 11.1 1.9a8 8 0 0 0 2-11.1Z"/></svg>
        </Link>

    </div>
  )
}

export default Sidbar