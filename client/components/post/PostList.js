import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Post } from './index'

const PostList = memo(() => {
  const posts = useSelector(state => state.post.posts)
  return (
    <>
      {posts.map(v => (
        <Post key={v.id} info={v} />
      ))}
    </>
  )
})

export default PostList
