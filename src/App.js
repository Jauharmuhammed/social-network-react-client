import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Feed from 'pages/Feed';
import PrivateRoute from 'utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import VerifyMail from 'features/auth/VerifyMail';
import VerifyPasswordChange from 'features/auth/VerifyPasswordChange';
import UserManagement from 'pages/admin/UserManagement';
import Admin from 'pages/admin/Admin';
import AdminRoute from 'utils/AdminRoute';

function App() {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>} />
        <Route path='/auth/email/verify/:uid/:token' element={<VerifyMail/>} />
        <Route path='/auth/forgot/password/:uid/:token' element={<VerifyPasswordChange/>} />

        <Route path='/admin' element={<AdminRoute><Admin/></AdminRoute>} />
        <Route path='/admin/user-management' element={<PrivateRoute><AdminRoute><UserManagement/></AdminRoute></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
