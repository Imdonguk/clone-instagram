import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import PropTypes from 'prop-types'

const PostHeader = ({ user }) => {
  return (
    <Wrap>
      <div className="user-image">
        <Link href={`/${user.name}`}>
          <a>
            <img src={user.profileImage} alt="프로필이미지" />
          </a>
        </Link>
      </div>
      <div className="user-name">
        <Link href={`/${user.name}`}>
          <a>{user.name}</a>
        </Link>
      </div>
    </Wrap>
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
