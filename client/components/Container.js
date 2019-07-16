import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from './Icons'

const dummy = {
  user: {
    name: 'woogie___boogie',
    profileImage:
      'https://scontent-gmp1-1.cdninstagram.com/vp/ea9c40f09035f1cee4f38ba78b3eb53b/5DB404A0/t51.2885-19/s150x150/66176870_271319490398976_1560280448049872896_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
    nickName: '덩욱',
  },
  followers: [],
  followings: [],
  posts: [
    {
      User: {
        id: 1,
        nickName: '',
        profileImage: '',
      },
      content: '첫번째 게시글',
      img:
        'https://scontent-gmp1-1.cdninstagram.com/vp/ab46ee91de6072677cf778369bafb2ef/5DA7AB18/t51.2885-15/sh0.08/e35/s640x640/66225780_887219248307464_8401340624033933855_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
      likeUserList: [],
    },
  ],
}

const Container = () => {
  const { user, posts } = dummy
  return (
    <Wrapper>
      <div className="content">
        <div className="left">
          <Post>
            <div className="post-head">
              <div className="user-image">
                <Link href={`/${dummy.user.name}`}>
                  <a>
                    <img src={dummy.user.profileImage} alt="프로필이미지" />
                  </a>
                </Link>
              </div>
              <div className="user-name">
                <Link href={`/${dummy.user.name}`}>
                  <a>{dummy.user.name}</a>
                </Link>
              </div>
            </div>
            <div className="post-content">
              <img src={posts[0].img} alt="게시물이미지" />
            </div>
            <div className="post-footer">
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
              <div className="like-user-count">좋아요 {posts[0].likeUserList.length}개</div>
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
            </div>
            <div className="setting" />
          </Post>
        </div>
        <div className="right">
          {/* <Storys /> */}
          <div className="woogie">ㅎㅎ</div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  & > .content {
    position: relative;
    display: grid;
    grid-template-columns: 61.4rem 1fr;
    margin: 13.7rem auto 0 auto;
    max-width: 93.5rem;
    height: 100vh;
    grid-gap: 2.8rem;
  }
`

const Post = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 6rem;
  border: 0.1rem solid #e6e6e6;
  background-color: #fff;

  .post-head {
    height: 6rem;
    padding: 1.6rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .user-image {
      width: 3.2rem;
      height: 3.2rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-name {
      margin-left: 1.2rem;
      font-size: 1.4rem;
      font-weight: 600;

      a {
        text-decoration: none;
        color: #000;
      }
    }
  }
  .post-content {
    img {
      width: 100%;
    }
  }

  .post-footer {
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

export default Container
