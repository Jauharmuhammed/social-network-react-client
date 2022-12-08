import React from 'react'
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Feed from 'pages/Feed';
import PrivateRoute from 'utils/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div><Toaster /></div>
      <Routes>
        <Route path='/' element={<PrivateRoute><Feed /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
