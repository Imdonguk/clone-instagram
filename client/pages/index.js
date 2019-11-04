import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import styled from 'styled-components'
import Header from '../components/Header'
import Container from '../components/Container'
import { LOAD_POSTS_REQUEST } from '../reducers/post'

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

Index.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST,
  })
}

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`

export default Index
