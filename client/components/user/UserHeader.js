import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { EditIcon } from '../Icons'
import { OPEN_EDIT_PROFILE_IMAGE, OPEN_EDIT_ACCOUNT } from '../../reducers/popover'

const UserHeader = () => {
  const { userName, name, image, postCount } = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const handleClickProfileImg = () => {
    dispatch({ type: OPEN_EDIT_PROFILE_IMAGE })
  }
  const handleClickEditAccountBtn = () => {
    dispatch({ type: OPEN_EDIT_ACCOUNT })
  }
  return (
    <Wrap>
      <div className="profile-image">
        <div className="button-wrap" onClick={handleClickProfileImg}>
          <button type="button">
            <img src={`http://localhost:3065/${image.src}`} alt="프로필이미지" />
          </button>
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-top">
          <h1>{userName}</h1>
          <a>
            <button type="button">프로필편집</button>
          </a>
          <div className="edit-wrap" onClick={handleClickEditAccountBtn}>
            <EditIcon />
          <div className="follow-button-wrap">
            <FollowButton user={userInfo} />
          </div>
        </div>
        <div className="profile-center">
          <div>
            게시물 <span>{postCount}</span>
          </div>
          <div>
            게시물 <span>81</span>
          </div>
          <div>
            게시물 <span>147</span>
          </div>
        </div>
        <div className="profile-bottom">{name}</div>
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
      width: 15rem;
      height: 15rem;
      margin: 0 auto;

      & button {
        width: 100%;
        height: 100%;
        border: 0;
        cursor: pointer;
        padding: 0;
        border-radius: 50%;
        outline: none;

        & > img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
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
      & button {
        font-size: 1.4rem;
        font-weight: 600;
        margin-left: 2rem;
        padding: 0.5rem 0.9rem;
        border-radius: 0.4rem;
        outline: none;
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
    }
    .profile-bottom {
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
`

export default UserHeader
