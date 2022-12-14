import React from 'react'
import Navbar from './Navbar'
import {PropTypes} from 'prop-types'
import Modal from 'features/auth/components/Modal'

export const Layout = ({children, setLoginOverlay, setSignupOverlay, feed}) => {
  return (
    <main className='min-h-screen bg-darkgray  pt-5 px-6 '>
        <Navbar feed={feed} setLoginOverlay={setLoginOverlay} setSignupOverlay={setSignupOverlay} />
        <div className='px-24'>{children}</div>
        <Modal></Modal>
    </main>
  )
}

