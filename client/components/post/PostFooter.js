import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from '../Icons'
import { ADD_COMMENT } from '../../reducers/post'
import { PostComment } from './index'

const PostFooter = ({ id, des, comments, likeList, user }) => {
  const commentRef = useRef('')
  const dispatch = useDispatch()
  const addComment = e => {
    e.preventDefault()
    dispatch({
      type: ADD_COMMENT,
      data: { id, user, comment: commentRef.current.value },
    })
    commentRef.current.value = ''
  }

  const handleClickCommentBtn = () => {
    commentRef.current.focus()
  }

  return (
    <Wrap>
      <div className="icons">
        <IconWrap first>
          <LikeIcon />
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
      <div className="like-user-count">좋아요 {likeList.length}개</div>
      <div className="comment">
        <PostComment name={user.name} comment={des} />
        {comments.map(v => (
          <PostComment name={v.user.name} comment={v.comment} id={v.id} key={v.id.toString()} />
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
