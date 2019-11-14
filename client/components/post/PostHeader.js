import React, { useMemo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import FollowBtn from './FollowButton'

const PostHeader = ({ user }) => {
  const { id, userName, image } = user
  return useMemo(
    () => (
      <Wrap>
        <div className="user-image">
          <Link href={{ pathname: '/user', query: { userName } }} as={`/${userName}`}>
            <a>
              <img src={`http://localhost:3065/${image.src}`} alt="프로필이미지" />
            </a>
          </Link>
        </div>
        <div className="user-name">
          <Link href={{ pathname: '/user', query: { userName } }} as={`/${userName}`}>
            <a>{userName}</a>
          </Link>
        </div>
        <FollowBtn user={user} mode="text" />
      </Wrap>
    ),
    [],
  )
}

const Wrap = styled.div`
  height: 6rem;
  padding: 1.6rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  .user-image {
    width: 3.2rem;
    height: 3.2rem;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .user-name {
    margin-left: 1.2rem;
    font-size: 1.4rem;
    font-weight: 600;

    a {
      text-decoration: none;
      color: #000;
    }
  }
`

export default PostHeader
