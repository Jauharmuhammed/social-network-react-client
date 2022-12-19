import React from 'react'
import Navbar from './Navbar'
import Modal from 'features/auth/components/Modal'
import Nav from './Nav'

export const Layout = ({children, setLoginOverlay, setSignupOverlay, landing, nonavbar}) => {
  return (
    <main className='min-h-screen bg-darkgray py-5 px-6 '>
        {!nonavbar && <Navbar landing={landing} setLoginOverlay={setLoginOverlay} setSignupOverlay={setSignupOverlay} />}
        <div className='px-5 lg:px-10 xl:px-24'>{children}</div>
        <Modal></Modal>
        <Nav landing={landing}/>
    </main>
  )
}

