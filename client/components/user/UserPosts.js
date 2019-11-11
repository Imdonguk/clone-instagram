import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import UserPost from './UserPost'

const UserPosts = () => {
  const userPosts = useSelector(state => state.post.userPosts)
  return (
    <Wrap>
      {userPosts.map(post => {
        return (
          <UserPost
            images={post.images}
            likeCount={post.likers.length}
            commentCount={post.commentCount}
            key={post.id}
          />
        )
      })}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2.8rem;

  & > div {
    height: 29.3rem;

    & > img {
      width: 100%;
    }
  }
`
export default UserPosts
