import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { ADD_COMMENT_REQUEST } from '../../reducers/post'

const PostInputForm = ({ postId }) => {
  const commentRef = useRef('')
  const dispatch = useDispatch()
  const addComment = useCallback(
    e => {
      e.preventDefault()
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: { postId, content: commentRef.current.value },
      })
      commentRef.current.value = ''
    },
    [commentRef.current],
  )
  return (
    <Wrap>
      <form onSubmit={addComment}>
        <input placeholder="댓글달기..." ref={commentRef} />
      </form>
    </Wrap>
  )
}

const Wrap = styled.div`
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
`

export default PostInputForm
