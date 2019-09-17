import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Post, PostForm, PostSetting } from './post'
import Footer from './Footer'

const Container = () => {
  const { posts, isPostSetting } = useSelector(state => state.post)
  const { userName, nickName, profileImage, isPostForm } = useSelector(state => state.user)
  return (
    <Wrapper>
      <div className="container">
        <div className="posts">
          {posts.map(v => (
            <Post key={v.id.toString()} info={v} />
          ))}
          {isPostForm && <PostForm />}
          {isPostSetting && <PostSetting />}
        </div>
        <div className="right">
          <div className="right-column">
            <div className="profile">
              <div className="profile-image">
                <img src={profileImage} alt="프로필사진" />
              </div>
              <div className="profile-text">
                <div className="user-name">
                  <Link href="/">
                    <a>{userName}</a>
                  </Link>
                </div>
                <div className="nick-name">{nickName}</div>
              </div>
            </div>
            <div className="story" />
            <div className="recommend" />
            <FooterWrap>
              <Footer page="main" />
            </FooterWrap>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;

  .container {
    position: relative;
    display: grid;
    grid-template-columns: 61.4rem 1fr;
    margin: 0 auto;
    max-width: 93.5rem;
    min-height: 100%;
    grid-gap: 2.8rem;
    padding-top: 6rem;
  }
  .right-column {
    position: relative;
    width: 29.3rem;

    .profile {
      padding-left: 0.5rem;
      margin-bottom: 1.2rem;
      height: 5rem;
      display: flex;
      align-items: center;

      &-image {
        width: 5rem;
        height: 5rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      &-text {
        margin-left: 1.4rem;
        .user-name {
          line-height: 1.8rem;
          margin-bottom: 0.2rem;
          font-weight: 600;
          font-size: 1.6rem;

          a {
            text-decoration: none;
            color: #262626;
          }
        }
        .nick-name {
          color: #999;
          font-size: 1.2rem;
        }
      }
    }
    .story {
      background-color: #fff;
      width: 100%;
      height: 223px;
      margin-top: 4px;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
    }
    .recommend {
      background-color: #fff;
      width: 100%;
      height: 197px;
      margin: 12px 0;
      border: 1px solid #e6e6e6;
      border-radius: 4px;
    }
  }
`

const FooterWrap = styled.div`
  width: 100%;
  height: 6.8rem;
  padding-bottom: 3.8rem;
  font-size: 1.1rem;
  color: #c7c7c7;
`

export default Container
