import React from 'react'
import Rotuer from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from '../common/PopoverStyle'
import { SIGN_OUT_REQUEST } from '../../reducers/user'

const EditAccount = () => {
  const dispatch = useDispatch()
  const isEditAccount = useSelector(state => state.popover.isEditAccount)
  const handleClickLogoutBtn = () => {
    dispatch({ type: SIGN_OUT_REQUEST })
    Rotuer.push('/signin')
  }
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
