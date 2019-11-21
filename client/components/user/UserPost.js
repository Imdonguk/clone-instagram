import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { WhiteLikeIcon, WhiteCommentIcon, SlideIcon } from '../Icons'

const UserPost = ({ images, likeCount, commentCount, postId }) => {
  const [isPostActivity, setisPostActivity] = useState(false)

  const isSlideIcon = useMemo(() => images.length > 1, [images])
  const handleMouseOverPost = () => setisPostActivity(true)
  const handleMouseLeavePost = () => setisPostActivity(false)

  return (
    <Link href={{ pathname: '/post', query: { id: postId } }} as={`/post/${postId}`}>
      <a>
        <Wrap onMouseOver={handleMouseOverPost} onMouseLeave={handleMouseLeavePost} onFocus={handleMouseOverPost}>
          <img src={`http://localhost:3065/${images[0].src}`} alt="게시물이미지" />
          {isSlideIcon && (
            <div className="slide-icon-wrap">
              <SlideIcon />
            </div>
          )}
          {isPostActivity && (
            <div className="post-activity">
              <div className="activity-wrap">
                <WhiteLikeIcon />
                <span className="activity-count">{likeCount}</span>
              </div>
              <div className="activity-wrap comment-count-wrap">
                <WhiteCommentIcon />
                <span className="activity-count">{commentCount}</span>
              </div>
            </div>
          )}
        </Wrap>
      </a>
    </Link>
  )
}

const Wrap = styled.div`
  position: relative;
  height: 29.3rem;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 100%;
  }

  .post-activity {
    position: absolute;
    z-index: 1;
    background-color: #00000050;
    width: 100%;
    height: 100%;
    top: 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .activity-count {
    font-size: 1.6rem;
    color: #fff;
    font-weight: 600;
    margin-left: 0.7rem;
  }

  .activity-wrap {
    display: flex;
    align-items: center;
    margin-right: 3rem;

    &.comment-count-wrap {
      margin: 0;
    }
  }

  .slide-icon-wrap {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;

    display: flex;
    justify-content: flex-end;
  }
`

export default UserPost
