import React, { useMemo } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { EditIcon } from '../Icons'
import { OPEN_EDIT_PROFILE_IMAGE, OPEN_EDIT_ACCOUNT, OPEN_USER_LIST } from '../../reducers/popover'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../../reducers/user'
import FollowButton from '../post/FollowButton'

const UserHeader = () => {
  const me = useSelector(state => state.user.me)
  const userInfo = useSelector(state => state.user.userInfo)
  const isOwner = useMemo(() => me.userName === userInfo.userName, [me.userName, userInfo.userName])

  const dispatch = useDispatch()
  const handleClickProfileImg = () => {
    dispatch({ type: OPEN_EDIT_PROFILE_IMAGE })
  }
  const handleClickEditAccountBtn = () => {
    dispatch({ type: OPEN_EDIT_ACCOUNT })
  }
  const handleClickFollowers = () => {
    dispatch({
      type: OPEN_USER_LIST,
      title: '팔로워',
      data: userInfo.userName,
    })
    dispatch({
      type: LOAD_FOLLOWERS_REQUEST,
      data: userInfo.userName,
    })
  }
  const handleClickFollowings = () => {
    dispatch({
      type: OPEN_USER_LIST,
      title: '팔로잉',
      data: userInfo.userName,
    })
    dispatch({
      type: LOAD_FOLLOWINGS_REQUEST,
      data: userInfo.userName,
    })
  }
  return (
    <Wrap>
      <div className="profile-image">
        <div className="button-wrap">
          <img src={`http://localhost:3065/${userInfo.image.src}`} alt="프로필이미지" />
          {isOwner && <button className="owner" type="button" title="프로필편집" onClick={handleClickProfileImg} />}
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-top">
          <h1>{userInfo.userName}</h1>
          {isOwner ? (
            <>
              <a>
                <button type="button" className="edit-profile">
                  프로필편집
                </button>
              </a>
              <div className="edit-wrap" onClick={handleClickEditAccountBtn}>
                <EditIcon />
              </div>
            </>
          ) : (
            <div className="follow-button-wrap">
              <FollowButton user={userInfo} />
            </div>
          )}
        </div>
        <div className="profile-center">
          <div>
            게시물 <span>{userInfo.postCount}</span>
          </div>
          <div className="followers" onClick={handleClickFollowers}>
            팔로워 <span>{isOwner ? me.followers.length : userInfo.followers.length}</span>
          </div>
          <div className="followings" onClick={handleClickFollowings}>
            팔로우 <span>{isOwner ? me.followings.length : userInfo.followings.length}</span>
          </div>
        </div>
        <div className="profile-bottom">{userInfo.name}</div>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  margin-bottom: 4.4rem;
  display: flex;
  & .profile-image {
    margin-right: 3rem;
    width: 30rem;

    & .button-wrap {
      position: relative;
      width: 15rem;
      height: 15rem;
      margin: 0 auto;

      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }

      & .owner {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        border-radius: 50%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }

  .profile-info {
    flex: 1;

    .profile-top {
      display: flex;
      margin-bottom: 2rem;
      height: 4rem;
      align-items: center;

      & > h1 {
        margin: 0;
        font-weight: 300;
        font-size: 2.8rem;
      }
      & .edit-profile {
        font-size: 1.4rem;
        font-weight: 600;
        margin-left: 2rem;
        padding: 0.5rem 0.9rem;
        border-radius: 0.4rem;
        outline: none;
        cursor: pointer;
      }

      .edit-wrap {
        width: 4rem;
        height: 4rem;
        margin-left: 0.5rem;

        display: flex;
        align-items: center;
        justify-content: center;
      }

      & .follow-button-wrap {
        width: 9.5rem;
        height: 2.8rem;
        margin-left: 2rem;
        font-size: 1.4rem;
      }
    }
    .profile-center {
      display: flex;
      margin-bottom: 2rem;
      & > div {
        font-size: 1.6rem;
        margin-right: 4rem;

        & > span {
          font-weight: 600;
        }
      }
      & .followers,
      .followings {
        cursor: pointer;
      }
    }
    .profile-bottom {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
`

export default UserHeader
