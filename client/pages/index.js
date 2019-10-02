import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Router from 'next/router'
import styled from 'styled-components'
import Header from '../components/Header'
import Container from '../components/Container'

const Index = () => {
  const { me } = useSelector(state => state.user)
  useEffect(() => {
    me.userName || Router.push('/signin')
  }, [me.userName])

  if (!me.userName) return null
  return (
    <Wrapper>
      <Header />
      <Container />
    </Wrapper>
  )
}

Index.getInitialProps = async context => {}

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`

export default Index
