import React, { memo } from 'react'
import styled from 'styled-components'
import { PostComment } from './index'

const PostCommentList = memo(({ description, comments, user }) => {
  return (
    <Wrap>
      <PostComment userName={user.userName} comment={description} />
      {comments.map(v => (
        <PostComment userName={v.user.userName} comment={v.content} id={v.id} key={v.id} />
      ))}
    </Wrap>
  )
})

const Wrap = styled.div``

export default PostCommentList
