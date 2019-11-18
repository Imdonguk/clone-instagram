import React from 'react'
import styled from 'styled-components'
import { PostComment } from './index'

const PostPageCommentList = ({ description, comments, user }) => {
  return (
    <>
      <PostCommentWrap>
        <div className="profile-image">
          <img
            src="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
            alt="유저프로필이미지"
          />
        </div>
        <PostComment
          userName={user.userName}
          comment="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
        />
      </PostCommentWrap>
      <PostCommentWrap>
        <div className="profile-image">
          <img
            src="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
            alt="유저프로필이미지"
          />
        </div>
        <PostComment
          userName={user.userName}
          comment="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
        />
      </PostCommentWrap>
      <PostCommentWrap>
        <div className="profile-image">
          <img
            src="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
            alt="유저프로필이미지"
          />
        </div>
        <PostComment
          userName={user.userName}
          comment="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
        />
      </PostCommentWrap>
      <PostCommentWrap>
        <div className="profile-image">
          <img
            src="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
            alt="유저프로필이미지"
          />
        </div>
        <PostComment
          userName={user.userName}
          comment="https://scontent-icn1-1.cdninstagram.com/vp/f2b9089ace1cd41cff2e6559a29325bb/5E65933F/t51.2885-19/s150x150/67402423_684413675394006_2748684227972169728_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com"
        />
      </PostCommentWrap>
      {comments.map(v => (
        <PostComment userName={v.user.userName} comment={v.content} id={v.id} />
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
