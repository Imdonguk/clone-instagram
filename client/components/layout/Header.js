import React, { useMemo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { OPEN_POST_FORM } from '../../reducers/popover'
import { SearchIcon, LogoIcon, LetterIcon, UploadIcon, ExploreIcon, LikeIcon, ProfileIcon } from '../Icons'

const Header = ({ page }) => {
  const dispatch = useDispatch()
  const userName = useSelector(state => state.user.me && state.user.me.userName)

  const isLogged = useMemo(() => userName, [userName])
  const openPostForm = () => {
    dispatch({ type: OPEN_POST_FORM })
  }

  return (
    <Wrapper>
      <NaviBar>
        <br />
        <Content>
          <Link href="/">
            <LogoWrap>
              <LogoIcon />
              <Boundary />
              <LetterIcon />
            </LogoWrap>
          </Link>

          <NavInput>
            <input className="search" />
            <div className="search-icon">
              <SearchIcon />
            </div>
          </NavInput>
          {isLogged ? (
            <Accounts>
              {page === 'main' && (
                <IconWrap first>
                  <UploadIcon onClick={openPostForm} />
                </IconWrap>
              )}
              <IconWrap>
                <ExploreIcon />
              </IconWrap>
              <IconWrap>
                <LikeIcon />
              </IconWrap>
              <Link href={{ pathname: '/user', query: { userName } }} as={`/${userName}`}>
                <a>
                  <IconWrap>
                    <ProfileIcon />
                  </IconWrap>
                </a>
              </Link>
            </Accounts>
          ) : (
            <Accounts>
              <Link href="/signin">
                <a>
                  <SigninButton>로그인</SigninButton>
                </a>
              </Link>
              <Link href="/signup">
                <a>
                  <SignupButton>가입하기</SignupButton>
                </a>
              </Link>
            </Accounts>
          )}
        </Content>
      </NaviBar>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 7.7rem;
  z-index: 10;
`

const NaviBar = styled.div`
  position: fixed;
  width: 100%;
  height: 7.7rem;
  display: grid;
  grid-template-columns: auto 101rem auto;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  z-index: 1;
`

const Content = styled.div`
  max-width: 101rem;
  display: flex;
  padding: 2.6rem 2rem;
  justify-content: space-between;
  flex-direction: row;
  box-sizing: border-box;
  height: 7.7rem;
`

const LogoWrap = styled.a`
  display: flex;
  width: 16rem;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
`

const Boundary = styled.div`
  width: 0.1rem;
  height: 2.8rem;
  background-color: #26262666;
  margin: 0 1.6rem;
`

const NavInput = styled.div`
  position: relative;

  & > .search {
    font-size: 1.4rem;
    padding-left: 2.5rem;
    width: 18rem;
    height: 2rem;
    outline: none;
  }

  & > .search-icon {
    position: absolute;
    left: 0;
    top: 0;
    width: 3rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Accounts = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const IconWrap = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-left: ${props => (props.first ? 0 : '3rem')};
  cursor: pointer;
`

const SigninButton = styled.button`
  font-size: 1.4rem;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  border-radius: 0.4rem;
  background-color: #3897f0;
  color: #fff;
  padding: 0.5rem 0.9rem;

  &:active : {
    opacity: 0.5;
  }
`

const SignupButton = styled(SigninButton)`
  background-color: #fff;
  color: #3897f0;
  border: 0;
  margin-left: 1rem;
`

export default Header
