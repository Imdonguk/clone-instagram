import React, { memo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import FollowBtn from './FollowButton'
import { apiUrl } from '../../config/config'

const PostHeader = memo(({ user }) => {
  const { userName, image } = user
  return (
    <Wrap>
      <div className="user-image">
        <Link href={{ pathname: '/user', query: { userName } }} as={`/${userName}`}>
          <a>
            <img src={`${apiUrl}/${image.src}`} alt="프로필이미지" />
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
  )
})

const Wrap = styled.div`
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
