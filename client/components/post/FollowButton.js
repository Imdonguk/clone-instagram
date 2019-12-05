import React, { useMemo } from 'react'
import Router from 'next/router'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { FOLLOW_USER_REQUEST } from '../../reducers/user'
import { OPEN_CANCLE_FOLLOW } from '../../reducers/popover'

const FollowButton = ({ user, mode }) => {
  const me = useSelector(state => state.user.me)
  const isFollow = useMemo(() => {
    return me.userName && !!me.followings.find(v => v.id === user.id)
  }, [me.userName && me.followings.length])
  const isLogged = useMemo(() => me.userName, [me.userName])
  const dispatch = useDispatch()
  const handleClickToFollow = () => {
    if (!isLogged) return Router.push('/signin')
    dispatch({
      type: FOLLOW_USER_REQUEST,
      data: user.id,
    })
  }

  const handleClickToUnFollow = () => {
    dispatch({
      type: OPEN_CANCLE_FOLLOW,
      data: user,
    })
  }

  if (user.id === me.id) return null

  if (mode === 'text')
    return (
      <Wrap>
        <span className="blank">•</span>

        {isFollow ? (
          <button type="button" onClick={handleClickToUnFollow}>
            팔로잉
          </button>
        ) : (
          <button type="button" className="follow" onClick={handleClickToFollow}>
            팔로우
          </button>
        )}
      </Wrap>
    )
  return (
    <>
      {isFollow ? (
        <Button type="button" isFollow={isFollow} onClick={handleClickToUnFollow}>
          팔로잉
        </Button>
      ) : (
        <Button type="button" onClick={handleClickToFollow}>
          팔로우
        </Button>
      )}
    </>
  )
}

const Wrap = styled.div`
  & .blank {
    margin: 0 0.4rem;
  }
  & button {
    padding: 0;
    border: 0;
    font-size: 1.4rem;
    font-weight: 600;
    cursor: pointer;
    color: #262626;
    outline: none;

    &:active {
      opacity: 0.5;
    }

    &.follow {
      color: #3897f0;
    }
  }
`

const Button = styled.button`
  width: 100%;
  height: 100%;

  border-radius: 0.4rem;
  font-size: inherit;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }

  ${({ isFollow }) =>
    isFollow
      ? css`
          background-color: #fff;
          color: #262626;
        `
      : css`
          background-color: #3897f0;
          color: #fff;
        `}
`

export default FollowButton
