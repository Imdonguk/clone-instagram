import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const HiperLink = ({ adress, isAccount }) => {
  return (
    <Wrap>
      <span>{isAccount ? '계정이 있으신가요?' : '계정이 없으신가요?'}</span>
      <Link href={adress}>
        <a>
          <span className="link">{isAccount ? '로그인' : '가입하기'}</span>
        </a>
      </Link>
    </Wrap>
  )
}

const Wrap = styled.p`
  color: #262626;
  font-size: 14px;
  margin: 15px;
  text-align: center;

  a {
    text-decoration: none;

    &:active {
      opacity: 0.5;
    }
  }
  .link {
    margin-left: 0.5rem;
    color: #3897f0;
    cursor: pointer;
  }
`

export default HiperLink
