import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Container from '../components/Container'
import Footer from '../components/Footer'

const Index = () => {
  return (
    <Wrapper>
      <Header />
      <Container />
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;
`

export default Index
