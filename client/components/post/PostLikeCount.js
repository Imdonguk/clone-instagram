import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { OPEN_USER_LIST } from '../../reducers/popover'
import { LOAD_LIKERS_REQUEST } from '../../reducers/user'

const PostLikeCount = ({ likers, postId }) => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch({
      type: OPEN_USER_LIST,
      data: postId,
      title: '좋아요',
    })

    dispatch({
      type: LOAD_LIKERS_REQUEST,
      data: postId,
    })
  }
  return <Wrap onClick={handleClick}>좋아요 {likers.length}개</Wrap>
}

const Wrap = styled.div`
  font-size: 1.4rem;
  height: 2rem;
  line-height: 2rem;
  color: #262626;
  margin-bottom: 0.8rem;
  font-weight: 600;
  cursor: pointer;
`

export default PostLikeCount
