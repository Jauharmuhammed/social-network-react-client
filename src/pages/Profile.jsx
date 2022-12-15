import { Layout } from 'components/Layout'
import UserDetails from 'features/users/components/UserDetails'
import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const {username} = useParams()
  
  return (
    <Layout>
        <UserDetails username={username}/>
    </Layout>
  )
}


export default Profile