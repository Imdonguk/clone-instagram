import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'

const Index = () => {
  const { userName, name, image } = useSelector(state => state.user.me)

  return (
    <Wrap>
      <div className="profile-image">
        <Link href={`/${userName}`}>
          <a>
            <img src={`http://localhost:3065/${image.src}`} alt="프로필사진" />
          </a>
        </Link>
      </div>
      <div className="profile-text">
        <div className="user-name">
          <Link href={`/${userName}`}>
            <a>{userName}</a>
          </Link>
        </div>
        <div className="nick-name">{name}</div>
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
