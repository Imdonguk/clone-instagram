import React, { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import styled from 'styled-components'
import Header from '../components/layout/Header'
import Container from '../components/main/Container'
import { PostForm, EditPost, CancleFollow, UserListPopover, UpdatePostForm } from '../components/popover'
import { LOAD_POSTS_REQUEST, RESET_HAS_MORE_POST } from '../reducers/post'

const Index = () => {
  const { posts, hasMorePost } = useSelector(state => state.post)
  const userName = useSelector(state => state.user.me && state.user.me.userName)
  const dispatch = useDispatch()
  const countRef = useRef([])

  useEffect(() => {
    userName || Router.push('/signin')
  }, [userName])

  const handleScrollMainPage = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight < document.documentElement.scrollHeight - 100) return
    if (!hasMorePost) return

    const lastId = posts[posts.length - 1] && posts[posts.length - 1].id
    if (countRef.current.includes(lastId)) return
    dispatch({
      type: LOAD_POSTS_REQUEST,
      lastId,
    })
    countRef.current.push(lastId)
  }, [posts.length, hasMorePost])

  useEffect(() => {
    hasMorePost && window.addEventListener('scroll', handleScrollMainPage)
    return () => {
      window.removeEventListener('scroll', handleScrollMainPage)
    }
  }, [posts.length, hasMorePost])

  if (!userName) return null
  return (
    <>
      <Wrapper>
        <Header page="main" />
        <Container />
      </Wrapper>
      <PostForm />
      <EditPost />
      <UserListPopover />
      <CancleFollow />
      <UpdatePostForm />
    </>
  )
}

Index.getInitialProps = async context => {
  const { me } = context.store.getState().user
  const { posts } = context.store.getState().post

  if (!me.userName) return

  context.store.dispatch({
    type: RESET_HAS_MORE_POST,
  })

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
