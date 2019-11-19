import React from 'react'
import styled from 'styled-components'
import { PostComment } from './index'

const PostPageCommentList = ({ description, comments, user }) => {
  return (
    <>
      <PostCommentWrap>
        <div className="profile-image">
          <img src={`http://localhost:3065/${user.image.src}`} alt="유저프로필이미지" />
        </div>
        <PostComment userName={user.userName} comment={description} />
      </PostCommentWrap>
      {comments.map(v => (
        <PostCommentWrap>
          <div className="profile-image">
            <img src={`http://localhost:3065/${v.user.image.src}`} alt="유저프로필이미지" />
          </div>
          <PostComment userName={v.user.userName} comment={v.content} />
        </PostCommentWrap>
      ))}
    </>
  )
}

const PostCommentWrap = styled.div`
  padding-top: 1.2rem;
  display: flex;
  word-break: break-all;

  & .profile-image {
    width: 3.2rem;
    height: 3.2rem;
    margin-right: 1.2rem;

    & > img {
      width: inherit;
      height: inherit;

      border-radius: 50%;
    }
  }
`

export default PostPageCommentList
