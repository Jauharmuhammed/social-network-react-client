import { Layout } from 'components/Layout'
import { PostPreview } from 'features/posts'
import React from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    const {id} = useParams()
  return (
    <Layout nonavbar>
        <PostPreview postId={id}/>
    </Layout>
  )
}

export default PostPage