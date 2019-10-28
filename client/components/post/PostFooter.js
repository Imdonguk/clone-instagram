import React, { useRef, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from '../Icons'
import { ADD_COMMENT, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post'
import { PostComment } from './index'

const PostFooter = ({ postId, des, comments, likers, user }) => {
  const commentRef = useRef('')
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.me && state.user.me.id)
  const isLiked = useMemo(() => !!likers.find(v => v === userId), [likers])

  const addComment = e => {
    e.preventDefault()
    dispatch({
      type: ADD_COMMENT,
      data: { postId, user, comment: commentRef.current.value },
    })
    commentRef.current.value = ''
  }

  const handleClickCommentBtn = () => {
    commentRef.current.focus()
  }

  const handleClickLikeBtn = useCallback(async () => {
    if (isLiked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: postId,
      })
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: postId,
      })
    }
  }, [isLiked])

  return (
    <Wrap>
      <div className="icons">
        <IconWrap first>
          <LikeIcon like={isLiked} onClick={handleClickLikeBtn} />
        </IconWrap>
        <IconWrap>
          <CommentIcon onClick={handleClickCommentBtn} />
        </IconWrap>
        <IconWrap>
          <ShareIcon />
        </IconWrap>
        <IconWrap last>
          <SaveIcon />
        </IconWrap>
      </div>
      <div className="like-user-count">좋아요 {likers.length}개</div>
      <div className="comment">
        <PostComment name={user.name} comment={des} />
        {comments.map(v => (
          <PostComment name={v.user.name} comment={v.comment} id={v.id} />
        ))}
      </div>
      <div className="input-comment">
        <form onSubmit={addComment}>
          <input placeholder="댓글달기..." ref={commentRef} />
        </form>
      </div>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  padding: 0 1.6rem;

  & > .icons {
    margin-top: 0.4rem;
    display: flex;
  }
  & > .like-user-count {
    font-size: 1.4rem;
    height: 2rem;
    line-height: 2rem;
    color: #262626;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }
  .input-comment {
    height: 5.6rem;
    border-top: 0.1rem solid #e6e6e6;
    display: flex;
    align-items: center;

    & > form {
      width: 100%;

      input {
        outline: none;
        border: 0;
        width: 100%;
        height: 1.8rem;
        font-size: 1.4rem;
      }
    }
  }
`

const IconWrap = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.first ? '-0.8rem' : props.last ? 'auto' : '0')};
  margin-right: ${props => (props.last ? '-1rem' : '0')};
`

export default PostFooter
