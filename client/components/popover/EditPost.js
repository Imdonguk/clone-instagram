import React from 'react'
import { useSelector } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from './PopoverStyle'

const EditPost = () => {
  const isEditPost = useSelector(state => state.popover.isEditPost)

  if (!isEditPost) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <PopoverButton type="button" location="top">
          게시물로 이동
        </PopoverButton>
        <PopoverButton type="button">저장하기</PopoverButton>
        <PopoverButton type="button" fontColor="blue">
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

export default EditPost
