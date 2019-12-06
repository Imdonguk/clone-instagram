import React, { memo } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import UserPost from './UserPost'

const UserPosts = memo(() => {
  const userPosts = useSelector(state => state.post.userPosts)
  return (
    <Wrap>
      {userPosts.map(post => {
        return (
          <UserPost
            images={post.images}
            likeCount={post.likers.length}
            commentCount={post.commentCount}
            postId={post.id}
            key={post.id}
          />
        )
      })}
    </Wrap>
  )
})

export const Wrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2.8rem;
`
export default UserPosts
