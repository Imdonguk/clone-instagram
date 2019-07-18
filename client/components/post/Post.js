import React from 'react'
import styled from 'styled-components'
import { PostHeader, PostContent, PostFooter } from './index'

const Post = ({ info }) => {
  return (
    <Wrap>
      <PostHeader user={info.user} />
      <PostContent img={info.image} />
      <PostFooter />
      <Setting />
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 6rem;
  border: 0.1rem solid #e6e6e6;
  background-color: #fff;
`

const Setting = styled.div``

export default Post
