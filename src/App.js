import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Feed from 'pages/Feed';
import PrivateRoute from 'utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import VerifyMail from 'features/auth/VerifyMail';
import VerifyPasswordChange from 'features/auth/VerifyPasswordChange';

function App() {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>} />
        <Route path='/auth/email/verify/:uid/:token' element={<VerifyMail/>} />
        <Route path='/auth/forgot/password/:uid/:token' element={<VerifyPasswordChange/>} />
      </Routes>
    </>
  );
}

export default App;
