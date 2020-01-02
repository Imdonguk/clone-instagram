import React, { useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from './PopoverStyle'
import { UPLOAD_PROFILE_IMAGE_REQUEST, REMOVE_PROFILE_IMAGE_REQUEST } from '../../reducers/user'

const EditProifileImage = () => {
  const isEditProfileImage = useSelector(state => state.popover.isEditProfileImage)
  const { userName, image } = useSelector(state => state.user.me)
  const imageInput = useRef()
  const dispatch = useDispatch()

  const handleClickUploadImageBtn = useCallback(() => {
    imageInput.current.click()
  }, [imageInput.current])
  const handleChangeProfileImage = useCallback(
    e => {
      const imageFormData = new FormData()
      imageFormData.append('profileImage', e.target.files[0])

      dispatch({
        type: UPLOAD_PROFILE_IMAGE_REQUEST,
        data: imageFormData,
        userName,
      })
    },
    [userName],
  )

  const handleClickDeleteImageBtn = useCallback(() => {
    dispatch({
      type: REMOVE_PROFILE_IMAGE_REQUEST,
      data: image.src,
      userName,
    })
  }, [userName, image.src])

  if (!isEditProfileImage || !userName) return null

  return (
    <PopoverWrap>
      <ButtonWrap>
        <NewPopoverButton location="top">프로필 사진 바꾸기</NewPopoverButton>
        <PopoverButton fontColor="blue" onClick={handleClickUploadImageBtn}>
          사진 업로드
        </PopoverButton>
        {image.src === '/static_profile.jpg' || (
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
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  box-sizing: border-box;
  height: 7rem;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid #aaa;
`

export default EditProifileImage
