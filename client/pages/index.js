import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import styled from 'styled-components'
import Header from '../components/layout/Header'
import Container from '../components/Container'
import { LOAD_POSTS_REQUEST } from '../reducers/post'
import { PostForm, EditPost } from '../components/popover'

const Index = () => {
  const userName = useSelector(state => state.user.me && state.user.me.userName)
  useEffect(() => {
    userName || Router.push('/signin')
  }, [userName])

  if (!userName) return null
  return (
    <>
      <Wrapper>
        <Header page="main" />
        <Container />
      </Wrapper>
      <PostForm />
      <EditPost />
    </>
  )
}

Index.getInitialProps = async context => {
  const { posts } = context.store.getState().post

  posts.length ||
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
