import { PostPreview } from 'features/posts'
import React from 'react'
import { useParams } from 'react-router-dom'

const PostPage = () => {
    const {id} = useParams()
  return (
        <PostPreview postId={id}/>
  )
}

export default PostPage