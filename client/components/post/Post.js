import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { PostHeader, PostContent, PostFooter } from './index'
import { SettingIcon } from '../Icons'
import { OPEN_POST_SETTING } from '../../reducers/post'

const Post = ({ info }) => {
  const dispatch = useDispatch()
  const { user, image, description, comments, likeList, id } = info
  const openPostSetting = () => {
    dispatch({
      type: OPEN_POST_SETTING,
    })
  }
  return (
    <Wrap>
      <PostHeader user={user} />
      <PostContent img={image} />
      <PostFooter user={user} id={id} des={description} comments={comments} likeList={likeList} />
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
