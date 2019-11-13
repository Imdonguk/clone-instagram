import React from 'react'
import { useSelector } from 'react-redux'
import { Wrap } from '../user/UserPosts'
import UserPost from '../user/UserPost'

const HashtagPosts = () => {
  const hashtagPosts = useSelector(state => state.post.hashtagPosts)
  return (
    <Wrap>
      {hashtagPosts.map(post => {
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

export default HashtagPosts
