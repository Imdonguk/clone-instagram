import React from 'react'
import styled from 'styled-components'
import { PostComment } from './index'
import { ViewMoreIcon } from '../Icons'

const PostPageCommentList = ({ description, comments, user }) => {
  return (
    <Wrap>
      <IconWrap>
        <ViewMoreIcon />
      </IconWrap>
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
          <PostComment userName={v.user.userName} comment={v.content} key={v.id} />
        </PostCommentWrap>
      ))}
    </Wrap>
  )
}

const Wrap = styled.div`
  position: absolute;
  width: 100%;
`

const IconWrap = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

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
