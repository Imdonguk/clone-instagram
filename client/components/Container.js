import React from 'react'
import styled from 'styled-components'

const Container = () => {
  return (
    <Wrapper>
      <div className="content">
        <PostCard />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  & > .content {
    margin: 13.7rem auto 0 auto;
    max-width: 93.5rem;
    height: 100vh;
    background-color: red;
  }
`

export default Container
