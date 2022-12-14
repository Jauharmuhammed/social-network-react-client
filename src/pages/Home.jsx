import React from 'react'
import { useSelector } from 'react-redux';
import Feed from './Feed';
import LandingPage from './LandingPage';

const Home = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    token ? <Feed/> : <LandingPage/>
  )
}

export default Home