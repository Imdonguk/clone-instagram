import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { PostHeader, PostContent, PostFooter } from './index'
import { SettingIcon } from '../Icons'
import { OPEN_EDIT_POST } from '../../reducers/popover'

const Post = ({ info }) => {
  const dispatch = useDispatch()
  const { user, images, description, comments, likers, id } = info
  const openPostSetting = () => {
    dispatch({
      type: OPEN_EDIT_POST,
    })
  }
  return useMemo(
    () => (
      <Wrap>
        <PostHeader user={user} />
        <PostContent img={images} />
        <PostFooter user={user} postId={id} des={description} comments={comments} likers={likers} />
        <Setting>
          <SettingIcon onClick={openPostSetting} />
        </Setting>
      </Wrap>
    ),
    [info],
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
