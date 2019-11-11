import React from 'react'
import { useSelector } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from '../common/PopoverStyle'

const PostSetting = () => {
  const isSettingPost = useSelector(state => state.popover.isSettingPost)

  if (!isSettingPost) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <PopoverButton type="button" location="top" fontColor="blue">
          수정하기
        </PopoverButton>
        <PopoverButton type="button" fontColor="red">
          제거하기
        </PopoverButton>
        <PopoverButton type="button" location="bottom" close>
          닫기
        </PopoverButton>
      </ButtonWrap>
    </PopoverWrap>
  )
}

export default PostSetting
