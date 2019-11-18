import React from 'react'
import styled from 'styled-components'

const PostLikeCount = ({ likers }) => {
  return <Wrap>좋아요 {likers.length}개</Wrap>
}

const Wrap = styled.div`
  font-size: 1.4rem;
  height: 2rem;
  line-height: 2rem;
  color: #262626;
  margin-bottom: 0.8rem;
  font-weight: 600;
`

export default PostLikeCount
