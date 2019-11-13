import React from 'react'
import styled, { css } from 'styled-components'

const Footer = ({ page }) => {
  return (
    <Content page={page}>
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
      <span className="yaer">© 2019 Instagram</span>
    </Content>
  )
}

const Content = styled.div`
  
  display: flex;
  margin: 0 auto;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: space-between;
  ${props =>
    props.page === 'main'
      ? css`
          display: flex;
          width: 100%;
          padding: 0;
          text-transform: none;
          flex-wrap: wrap;
        `
      : css`
          display: flex;
          max-width: 93.5rem;
          height: 100%;
          padding: 3.8rem 0;
          color: #999;
          text-transform: uppercase;
        `}

  .yaer{
    text-transform : uppercase;
  }

  nav {
    ${props =>
      props.page === 'main'
        ? css`
            display: flex;
            margin-bottom: 1.6rem;
          `
        : css`
            width: 64.1rem;
            text-align: center;
          `}
    

    ul {
      margin: 0 1.6rem 0.3rem 0;
      padding: 0;
      list-style: none;

      ${props =>
        props.page === 'common'
          ? css`
              display: block;
              line-height: 1.8rem;
            `
          : css`
              display: flex;
              justify-content: space-around;
            `}
      
      li{
        ${props =>
          props.page === 'main' &&
          css`
            display: inline-block;
            font-weight: 400;
            line-height: 1.3rem;

            ::after {
              content: ' ';
              margin: 0 0.3rem;
            }
          `}
      }
      .link {
          cursor: pointer;
          color:${props => (props.page === 'main' ? '#c7c7c7' : '#003569')} ;
      }
  }
`

export default Footer
