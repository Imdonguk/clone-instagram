import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from './PopoverStyle'
import { SIGN_OUT_REQUEST } from '../../reducers/user'
import { CLOSE_EDIT_ACCOUNT } from '../../reducers/popover'

const EditAccount = () => {
  const dispatch = useDispatch()
  const isEditAccount = useSelector(state => state.popover.isEditAccount)
  const handleClickLogoutBtn = useCallback(() => {
    dispatch({ type: SIGN_OUT_REQUEST })
  }, [])

  const handleClickCancleBtn = useCallback(() => {
    dispatch({ type: CLOSE_EDIT_ACCOUNT })
  }, [])
  if (!isEditAccount) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <PopoverButton location="top" onClick={handleClickLogoutBtn}>
          로그아웃
        </PopoverButton>
        <PopoverButton location="bottom" onClick={handleClickCancleBtn}>
          닫기
        </PopoverButton>
      </ButtonWrap>
    </PopoverWrap>
  )
}

export default EditAccount
