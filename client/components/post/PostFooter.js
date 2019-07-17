import React from 'react'
import styled from 'styled-components'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from '../Icons'

const PostFooter = () => {
  return (
    <Wrap>
      <div className="icons">
        <IconWrap first>
          <LikeIcon />
        </IconWrap>
        <IconWrap>
          <CommentIcon />
        </IconWrap>
        <IconWrap>
          <ShareIcon />
        </IconWrap>
        <IconWrap last>
          <SaveIcon />
        </IconWrap>
      </div>
      <div className="like-user-count">좋아요 0개</div>
      <div className="comment">
        <div className="comment-item">
          <span className="comment-item-user-name">woogie___boogie</span>
          <span className="comment-item-inner">하이하이</span>
        </div>
        <div className="comment-item">
          <span className="comment-item-user-name">woogie___boogie</span>
          <span className="comment-item-inner">하이하이</span>
        </div>
        <div className="comment-item">
          <span className="comment-item-user-name">woogie___boogie</span>
          <span className="comment-item-inner">하이하이</span>
        </div>
      </div>
      <div className="input-comment">
        <form>
          <input placeholder="댓글달기..." />
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
  .comment-item {
    width: 100%;
    font-size: 1.4rem;
    margin-bottom: 1rem;

    &-user-name {
      margin-right: 0.5rem;
      font-weight: 800;
    }
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
