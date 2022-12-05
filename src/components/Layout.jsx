import React from 'react'
import Navbar from './Navbar'
import {PropTypes} from 'prop-types'

export const Layout = ({children, setLoginOverlay, setSignupOverlay, feed}) => {
  return (
    <main className='min-h-screen bg-darkgray  pt-5 px-6'>
        <Navbar feed={feed} setLoginOverlay={setLoginOverlay} setSignupOverlay={setSignupOverlay} />
        <div className='px-24'>{children}</div>
    </main>
  )
}

