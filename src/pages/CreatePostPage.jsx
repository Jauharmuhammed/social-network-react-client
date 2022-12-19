import { Layout } from 'components/Layout'
import { CreatePost } from 'features/posts'
import React from 'react'

const CreatePostPage = () => {
  return (
    <Layout nonavbar >
        <CreatePost/>
    </Layout>
  )
}

export default CreatePostPage