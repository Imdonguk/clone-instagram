import React from 'react'
import styled from 'styled-components'

const PostComment = ({ id, userName, comment }) => {
  return (
    <Item>
      <Name>{userName}</Name>
      {comment}
    </Item>
  )
}

const Item = styled.div`
  width: 100%;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`
const Name = styled.span`
  margin-right: 0.5rem;
  font-weight: 600;
`

export default PostComment
