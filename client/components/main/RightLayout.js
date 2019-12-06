import React, { memo } from 'react'
import styled from 'styled-components'
import Profile from './Profile'
import Story from './Story'
import Recommend from './Recommend'
import Footer from '../layout/Footer'

const RightLayout = memo(() => {
  return (
    <Wrap>
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
    </Wrap>
  )
})

const Wrap = styled.div`
  position: fixed;
  width: 29.3rem;
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

export default RightLayout
