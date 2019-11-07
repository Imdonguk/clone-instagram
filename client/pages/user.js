import React from 'react'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { FooterWrap } from '../components/account'
import UserTemplate from '../components/user/UserTemplate'

const User = () => {
  const { userName, name } = useSelector(state => state.user.userInfo)
  const isLodding = useSelector(state => state.user.isLoddingOwner)

  if (isLodding) return null
  return (
    <Wrapper>
      <Helmet
        title={`${name} (${userName})`}
        meta={[
          {
            name: 'og:title',
            content: `${name} (${userName})`,
          },
          {
            name: 'og:description',
            content: `${userName}의 instagram`,
          },
        ]}
      />
      <Header />
      <Main>
        <UserTemplate />
      </Main>
      <FooterWrap>
        <Footer page="common" />
      </FooterWrap>
    </Wrapper>
    // <EditProfileImage />
  )
}

user.getInitialProps = async context => {
  console.log(`userName is ${context.query.userName}`)
  return { userName: context.query.userName }
const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background-color: #fafafa;

  display: flex;
  flex-direction: column;
`

const Main = styled.div`
  width: 93.5rem;
  margin: 0 auto;
  flex: 1;
`
}
export default user
