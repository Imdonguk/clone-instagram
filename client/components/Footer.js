import React from 'react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <Wrapper>
      <Content>
        <nav>
          <ul>
            <li>
              <span className="link">instagram 정보</span>
            </li>
            <li>
              <span className="link">지원</span>
            </li>
            <li>
              <span className="link">홍보 센터</span>
            </li>
            <li>
              <span className="link">API</span>
            </li>
            <li>
              <span className="link">채용 정보</span>
            </li>
            <li>
              <span className="link">개인정보처리방침</span>
            </li>
            <li>
              <span className="link">약관</span>
            </li>
            <li>
              <span className="link">디렉터리</span>
            </li>
            <li>
              <span className="link">프로필</span>
            </li>
            <li>
              <span className="link">해시태그</span>
            </li>
            <li>
              <span className="link">언어</span>
            </li>
          </ul>
        </nav>
        <span>© 2019 Instagram</span>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 10.4rem;
  padding: 0 2rem;
  box-sizing: border-box;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
`
const Content = styled.div`
  display: flex;
  max-width: 93.5rem;
  height: 100%;
  padding: 3.8rem 0;
  margin: 0 auto;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  color: #999;

  & > nav {
    width: 64.1rem;
    text-align: center;

    ul {
      margin: 0 1.6rem 0.3rem 0;
      padding: 0;
      list-style: none;
      display: flex;
      justify-content: space-around;

      .link {
          cursor: pointer;
          color: #003569;
      }
  }
`
export default Footer
