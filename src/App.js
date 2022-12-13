import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Feed, Admin, UserManagement } from 'pages/index';
import PrivateRoute from 'utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';
import VerifyMail from 'features/auth/components/VerifyMail';
import VerifyPasswordChange from 'features/auth/components/VerifyPasswordChange';
import AdminRoute from 'utils/AdminRoute';

function App() {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>} />
        <Route path='/auth/email/verify/:uid/:token' element={<VerifyMail />} />
        <Route path='/auth/forgot/password/:uid/:token' element={<VerifyPasswordChange />} />

        <Route path='/admin' element={<AdminRoute><Admin /></AdminRoute>} />
        <Route path='/admin/user-management' element={<PrivateRoute><AdminRoute><UserManagement /></AdminRoute></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
