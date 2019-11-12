import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from '../common/PopoverStyle'
import { UPLOAD_PROFILE_IMAGE_REQUEST, REMOVE_PROFILE_IMAGE_REQUEST } from '../../reducers/user'

const EditProifileImage = () => {
  const isSettingProfileImage = useSelector(state => state.popover.isSettingProfileImage)
  const userName = useSelector(state => state.user.me.userName)
  const image = userName && useSelector(state => state.user.me.image)
  const imageInput = useRef()
  const dispatch = useDispatch()

  const handleClickUploadImageBtn = () => {
    imageInput.current.click()
  }
  const handleChangeProfileImage = e => {
    const imageFormData = new FormData()
    imageFormData.append('profileImage', e.target.files[0])

    dispatch({
      type: UPLOAD_PROFILE_IMAGE_REQUEST,
      data: imageFormData,
      userName,
    })
  }

  const handleClickDeleteImageBtn = () => {
    dispatch({
      type: REMOVE_PROFILE_IMAGE_REQUEST,
      data: image.src,
      userName,
    })
  }
  if (!isSettingProfileImage || !userName) return null

  return (
    <PopoverWrap>
      <ButtonWrap>
        <NewPopoverButton location="top">프로필 사진 바꾸기</NewPopoverButton>
        <PopoverButton fontColor="blue" onClick={handleClickUploadImageBtn}>
          사진 업로드
        </PopoverButton>
        {image.src === 'static_profile.jpg' || (
          <PopoverButton fontColor="red" onClick={handleClickDeleteImageBtn}>
            현재 사진 삭제
          </PopoverButton>
        )}
        <PopoverButton location="bottom" close>
          닫기
        </PopoverButton>
      </ButtonWrap>

      <form encType="multipart/form-data">
        <input type="file" hidden ref={imageInput} onChange={handleChangeProfileImage} />
      </form>
    </PopoverWrap>
  )
}

const NewPopoverButton = styled(PopoverButton).attrs({
  as: 'div',
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-sizing: border-box;
  height: 7rem;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid #aaa;
`

export default EditProifileImage
