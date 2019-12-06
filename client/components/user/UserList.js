import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import FollowButton from '../post/FollowButton'

const UserList = ({ title, action, data }) => {
  const { userList, hasMoreUser } = useSelector(state => state.user)
  const dispatch = useDispatch()
  return (
    <Wrap>
      <div className="title-wrap">
        <div className="title">{title}</div>
      </div>
      <div className="user-list-wrap">
        <div className="user-list">
          {userList.map(v => (
            <User user={v} key={v.id} />
          ))}
        </div>
      </div>
    </Wrap>
  )
}

const User = ({ user }) => {
  if (!user) return null
  return useMemo(
    () => (
      <UserWrap>
        <Link href={{ pathname: '/user', query: { userName: user.userName } }} as={`/${user.userName}`}>
          <a>
            <div className="user-image">
              <img src={`http://localhost:3065/${user.image.src}`} alt="유저프로필이미지" />
            </div>
          </a>
        </Link>

        <div className="user-name-wrap">
          <Link href={{ pathname: '/user', query: { userName: user.userName } }} as={`/${user.userName}`}>
            <a>
              <div className="user-name">{user.userName}</div>
            </a>
          </Link>
          <div className="name">{user.name}</div>
        </div>
        <div className="follow-button-wrap">
          <FollowButton user={user} />
        </div>
      </UserWrap>
    ),
    [user.id],
  )
}

const Wrap = styled.div`
  width: 40rem;
  height: 40rem;
  background-color: #fff;
  border-radius: 1.5rem;

  display: flex;
  flex-direction: column;

  & .title-wrap {
    height: 4.3rem;
    border-bottom: 0.1rem solid #e6e6e6;

    display: flex;
    align-items: center;
    justify-content: center;

    & .title {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }

  & .user-list-wrap {
    position: relative;
    flex: 1;
    overflow: auto;

    & .user-list {
      width: 100%;
      position: absolute;
    }
  }
`

const UserWrap = styled.div`
  width: 100%;
  height: 6rem;
  padding: 0.8rem 1.6rem;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  & .user-image {
    width: 4.4rem;
    height: 4.4rem;
    margin-right: 1.2rem;
    & img {
      width: inherit;
      height: inherit;

      border-radius: 50%;
    }
  }
  & .user-name-wrap {
    flex: 1;

    & div {
      font-size: 1.4rem;
      height: 1.8rem;
      line-height: 1.8rem;
    }
    & .user-name {
      font-weight: 600;
    }

    & .name {
      color: #999;
    }
  }
  & .follow-button-wrap {
    width: 6rem;
    height: 3rem;
    font-size: 1.4rem;
  }
`

export default UserList
