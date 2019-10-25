import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import styled from 'styled-components'
import Header from '../components/Header'
import Container from '../components/Container'
// import { LOAD_MAIN_POSTS } from '../reducers'

const Index = () => {
  const userName = useSelector(state => state.user.me && state.user.me.userName)
  useEffect(() => {
    userName || Router.push('/signin')
  }, [userName])

  if (!userName) return null
  return (
    <Wrapper>
      <Header />
      <Container />
    </Wrapper>
  )
}

// Index.getInitialProps = async context => {}

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`

export default Index
