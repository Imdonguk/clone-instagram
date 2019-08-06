import React from 'react'
import styled from 'styled-components'
import { AccountWrap, Content, LetterIcon, HiperLink, AppDown } from '../components/account'

const Signup = () => {
  return (
    <AccountWrap>
      <Content>
        <div className="box">
          <LetterIcon />
          <Title>친구들의 사진과 동영상을 보려면 가입하세요.</Title>
          <form>
            <input name="name" type="text" placeholder="성명" required />
            <input name="userName" type="text" placeholder="사용자 이름" required />
            <input name="password" type="password" placeholder="비밀번호" required />
            <button type="submit">가입</button>
          </form>
          <Policy>가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</Policy>
        </div>
        <div className="box">
          <HiperLink adress="/signin" isAccount />
        </div>
        <AppDown />
      </Content>
    </AccountWrap>
  )
}

const Title = styled.h2`
  font-size: 1.7rem;
  font-weight: 600;
  margin: 0 4rem 2rem;
  text-align: center;
  color: #999;
  line-height: 2rem;
`

const Policy = styled.p`
  text-align: center;
  color: #999;
  margin: 1rem 5rem;
  font-size: 1.4rem;
  line-height: 1.4rem;
`
export default Signup
