import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Container from '../components/Container'

const Index = () => {
  return (
    <Wrapper>
      <Header />
      <Container />
    </Wrapper>
  )
}

Index.getInitialProps = async context => {
  const { isServer, res, req } = context
  if (isServer && !req.headers.cookie) {
    res.writeHead(301, { Location: '/signin' })
    res.end()
  }
}

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`

export default Index
