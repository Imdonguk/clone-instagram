import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from './PopoverStyle'
import { UNFOLLOW_USER_REQUEST } from '../../reducers/user'
import { CLOSE_CANCLE_FOLLOW } from '../../reducers/popover'

const CancleFollow = () => {
  const dispatch = useDispatch()
  const { isCancleFollow, cancleFollowData } = useSelector(state => state.popover)

  const handleClickUnFollowBtn = useCallback(() => {
    dispatch({
      type: UNFOLLOW_USER_REQUEST,
      data: cancleFollowData.id,
    })
    dispatch({ type: CLOSE_CANCLE_FOLLOW })
  }, [cancleFollowData])

  const handleClickCancleBtn = useCallback(() => {
    dispatch({
      type: CLOSE_CANCLE_FOLLOW,
    })
  })

  if (!isCancleFollow) return null
  if (!cancleFollowData) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <PopoverRow location="top">
          <div className="user-image">
            <img src={cancleFollowData.image.src} alt="유저프로필이미지" />
          </div>
        </PopoverRow>
        <PopoverRow>
          <span>@{cancleFollowData.userName}님의 팔로우를 취소하시겠습니까?</span>
        </PopoverRow>
        <PopoverButton fontColor="red" onClick={handleClickUnFollowBtn}>
          팔로우 취소
        </PopoverButton>
        <PopoverButton location="bottom" onClick={handleClickCancleBtn}>
          취소
        </PopoverButton>
      </ButtonWrap>
    </PopoverWrap>
  )
}

const PopoverRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  background-color: #fff;
  border-bottom: 0.1rem solid #aaa;
  ${props =>
    props.location === 'top' &&
    css`
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
      border: 0;
    `}
  & .user-image {
    margin-top: 3.2rem;
    margin-bottom: 1.6rem;
    width: 100%;
    text-align: center;
    & img {
      border-radius: 50%;
      width: 9rem;
      height: 9rem;
    }
  }
  & span {
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
`

export default CancleFollow
