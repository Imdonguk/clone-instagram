import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Wrap } from './PostForm'

const PostSetting = () => {
  const isSettingPost = useSelector(state => state.popover.isSettingPost)
  if (!isSettingPost) return null
  return (
    <Wrap>
      <Box>
        <EditButton>수정하기</EditButton>
        <RemoveButton>제거하기</RemoveButton>
      </Box>
    </Wrap>
  )
}

const Box = styled.div`
  width: 40rem;
  background-color: #fff;
  border-radius: 2rem;
`

const BasicButton = styled.button`
  width: 100%;
  height: 7rem;
  font-size: 1.6rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
`

const EditButton = styled(BasicButton)`
  color: #3897f0;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
`

const RemoveButton = styled(BasicButton)`
  color: #ed4956;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
`

export default PostSetting
