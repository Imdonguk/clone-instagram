import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from '../common/PopoverStyle'

const EditProifileImage = () => {
  const isSettingProfileImage = useSelector(state => state.popover.isSettingProfileImage)
  const { image } = useSelector(state => state.user.me.userName && state.user.me)
  const imageInput = useRef()

  if (!isSettingProfileImage) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <NewPopoverButton location="top">프로필 사진 바꾸기</NewPopoverButton>
        <PopoverButton fontColor="blue">사진 업로드</PopoverButton>
        {image.src === 'static_profile.jpg' || <PopoverButton fontColor="red">현재 사진 삭제</PopoverButton>}
        <PopoverButton location="bottom" close>
          닫기
        </PopoverButton>
      </ButtonWrap>

      <form encType="multipart/form-data">
        <input type="file" hidden ref={imageInput} />
      </form>
    </PopoverWrap>
  )
}

const NewPopoverButton = styled(PopoverButton)`
  height: 7rem;
  font-size: 1.8rem;
`

export default EditProifileImage
