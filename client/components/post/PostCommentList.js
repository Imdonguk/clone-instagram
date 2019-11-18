import React from 'react'
import styled from 'styled-components'
import { PostComment } from './index'

const PostCommentList = ({ description, comments, user }) => {
  return (
    <Wrap>
      <PostComment userName={user.userName} comment={description} />
      {comments.map(v => (
        <PostComment userName={v.user.userName} comment={v.content} id={v.id} />
      ))}
    </Wrap>
  )
}

const Wrap = styled.div``

export default PostCommentList
