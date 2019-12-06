import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from './PopoverStyle'
import { SIGN_OUT_REQUEST } from '../../reducers/user'

const EditAccount = () => {
  const dispatch = useDispatch()
  const isEditAccount = useSelector(state => state.popover.isEditAccount)
  const handleClickLogoutBtn = useCallback(() => {
    dispatch({ type: SIGN_OUT_REQUEST })
  }, [])
  if (!isEditAccount) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <PopoverButton location="top" onClick={handleClickLogoutBtn}>
          로그아웃
        </PopoverButton>
        <PopoverButton location="bottom" close>
          닫기
        </PopoverButton>
      </ButtonWrap>
    </PopoverWrap>
  )
}

export default EditAccount
