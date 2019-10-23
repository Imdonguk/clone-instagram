import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Profile from './profile'
import Story from './story'
import Recommend from './recommend'
import { Post, PostForm, PostSetting } from './post'
import Footer from './Footer'

const Container = () => {
  const { posts, isPostSetting } = useSelector(state => state.post)
  const { isPostForm } = useSelector(state => state.user)

  return (
    <Wrapper>
      <div className="container">
        <div className="posts">
          {posts.map(v => (
            <Post key={v.id} info={v} />
          ))}
          {isPostForm && <PostForm />}
          {isPostSetting && <PostSetting />}
        </div>
        <div className="right">
          <div className="right-column">
            <ProfileWrap>
              <Profile />
            </ProfileWrap>
            <StoryWrap>
              <Story />
            </StoryWrap>
            <RecommendWrap>
              <Recommend />
            </RecommendWrap>
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
  }
`

const ProfileWrap = styled.div`
  height: 6.2rem;
`

const StoryWrap = styled.div`
  background-color: #fff;
  width: 29.3rem;
  height: 22.3rem;
  margin-top: 0.4rem;
  border: 0.1rem solid #e6e6e6;
  border-radius: 0.4rem;
  overflow: hidden auto;
`

const RecommendWrap = styled.div`
  background-color: #fff;
  width: 100%;
  height: 19.7rem;
  margin: 1.2rem 0;
  border: 0.1rem solid #e6e6e6;
  border-radius: 0.4rem;
`

const FooterWrap = styled.div`
  width: 100%;
  height: 6.8rem;
  padding-bottom: 3.8rem;
  font-size: 1.1rem;
  color: #c7c7c7;
`

export default Container
