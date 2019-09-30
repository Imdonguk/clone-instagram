import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Index = () => {
  const { userName, nickName, profileImage } = useSelector(state => state.user)

  return (
    <Wrap>
      <div className="profile-image">
        <img src={profileImage} alt="프로필사진" />
      </div>
      <div className="profile-text">
        <div className="user-name">
          <Link href="/">
            <a>{userName}</a>
          </Link>
        </div>
        <div className="nick-name">{nickName}</div>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  padding-left: 0.5rem;
  margin-bottom: 1.2rem;
  height: 5rem;
  display: flex;
  align-items: center;

  .profile-image {
    width: 5rem;
    height: 5rem;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .profile-text {
    margin-left: 1.4rem;

    & > .user-name {
      line-height: 1.8rem;
      margin-bottom: 0.2rem;
      font-weight: 600;
      font-size: 1.4rem;

      a {
        text-decoration: none;
        color: #262626;
      }
    }
    & > .nick-name {
      color: #999;
      font-size: 1.2rem;
    }
  }
`

export default Index