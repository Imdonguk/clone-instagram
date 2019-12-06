import React, { memo } from 'react'
import styled from 'styled-components'
import { PostList } from '../post'
import RightLayout from './RightLayout'

const Container = memo(() => {
  return (
    <Wrapper>
      <div className="container">
        <div className="posts">
          <PostList />
        </div>
        <div className="right">
          <RightLayout />
        </div>
      </div>
    </Wrapper>
  )
})

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
`

export default Container
