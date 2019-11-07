import React from 'react'
import styled from 'styled-components'
import { PostIcon } from '../Icons'
import UserHeader from './UserHeader'
import UserPosts from './UserPosts'

const UserTemplate = () => {
  return (
    <Wrap>
      <UserHeader />
      <UserNav>
        <a>
          <PostIcon />
          <span>게시물</span>
        </a>
      </UserNav>
      <UserPosts />
    </Wrap>
  )
}

const Wrap = styled.div`
  padding-top: 6rem;
`

const UserNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5.3rem;
  border-top: 0.1rem solid #efefef;

  & > a {
    display: flex;
    align-items: center;
    height: 100%;
    border-top: 0.1rem solid;
    color: #262626;
    letter-spacing: 1px;
    font-size: 1.3rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;

    & > *:nth-child(2) {
      margin-left: 0.6rem;
    }
  }
`

export default UserTemplate
