import React from 'react'
import Navbar from './Navbar'
import Modal from 'features/auth/components/Modal'
import Nav from './Nav'

export const Layout = ({children, setLoginOverlay, setSignupOverlay, landing}) => {
  return (
    <main className='min-h-screen bg-darkgray  pt-5 px-6 '>
        <Navbar landing={landing} setLoginOverlay={setLoginOverlay} setSignupOverlay={setSignupOverlay} />
        <div className='px-24'>{children}</div>
        <Modal></Modal>
        <Nav landing={landing}/>
    </main>
  )
}

