import React from 'react'
import styled from 'styled-components'
import { Post } from './post/index'

const Container = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          <Post />
        </div>
        <div className="right">
          <div className="woogie">ㅎㅎ</div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  & > .container {
    position: relative;
    display: grid;
    grid-template-columns: 61.4rem 1fr;
    margin: 13.7rem auto 0 auto;
    max-width: 93.5rem;
    height: 100vh;
    grid-gap: 2.8rem;
  }
`

export default Container
