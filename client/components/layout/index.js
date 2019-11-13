import React from 'react'
import Header from './Header'
import FooterWrap from './FooterWrap'
import Footer from './Footer'
import Wrapper from './Wrapper'
import Main from './Main'

const AppLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
      <FooterWrap>
        <Footer />
      </FooterWrap>
    </Wrapper>
  )
}

export default AppLayout
