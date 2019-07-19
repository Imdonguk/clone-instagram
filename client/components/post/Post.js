import React from 'react'
import styled from 'styled-components'
import { PostHeader, PostContent, PostFooter } from './index'
import { SettingIcon } from '../Icons'

const Post = ({ info }) => {
  return (
    <Wrap>
      <PostHeader user={info.user} />
      <PostContent img={info.image} />
      <PostFooter />
      <Setting>
        <SettingIcon onClick={openPostSetting} />
      </Setting>
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

const Setting = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 6rem;
  right: 0.4rem;
  bottom: -1rem;
  top: 0;
`

export default Post
