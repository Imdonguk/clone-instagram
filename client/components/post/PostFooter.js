import React from 'react'
import styled from 'styled-components'
import { PostIcons, PostLikeCount, PostCommentList, PostInputForm } from './index'

const PostFooter = ({ info }) => {
  const { id: postId, likers, description, previewComments, user } = info
  return (
    <Wrap>
      <PostIcons postId={postId} likers={likers} />
      <PostLikeCount postId={postId} likers={likers} />
      <PostCommentList description={description} comments={previewComments} user={user} />
      <PostInputForm postId={postId} />
    </Wrap>
  )
}

const Wrap = styled.div`
  .input-comment {
    height: 5.6rem;
    border-top: 0.1rem solid #e6e6e6;
    display: flex;
    align-items: center;

    & > form {
      width: 100%;

      input {
        outline: none;
        border: 0;
        width: 100%;
        height: 1.8rem;
        font-size: 1.4rem;
      }
    }
  }
`

export default PostFooter
