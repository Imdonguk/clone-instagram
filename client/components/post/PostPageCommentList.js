import React, { memo, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { PostComment } from './index'
import { ViewMoreIcon } from '../Icons'
import { LOAD_COMMENTS_REQUEST } from '../../reducers/post'

const PostPageCommentList = memo(() => {
  const dispatch = useDispatch()
  const { id: postId, description, comments = [], user, hasMoreComment } = useSelector(state => state.post.post)
  const lastId = comments.length && comments[0].id

  const handleClickViewMore = useCallback(() => {
    if (!hasMoreComment) return
    dispatch({
      type: LOAD_COMMENTS_REQUEST,
      postId,
      lastId,
    })
  }, [postId, lastId])
  return (
    <Wrap>
      {hasMoreComment && (
        <IconWrap>
          <ViewMoreIcon onClick={handleClickViewMore} />
        </IconWrap>
      )}
      <PostCommentWrap>
        <div className="profile-image">
          <img src={user.image.src} alt="유저프로필이미지" />
        </div>
        <PostComment userName={user.userName} comment={description} />
      </PostCommentWrap>
      {comments.map(v => (
        <PostCommentWrap>
          <div className="profile-image">
            <img src={v.user.image.src} alt="유저프로필이미지" />
          </div>
          <PostComment userName={v.user.userName} comment={v.content} key={v.id} />
        </PostCommentWrap>
      ))}
    </Wrap>
  )
})

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
