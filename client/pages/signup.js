import React, { useRef, useState } from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import axios from 'axios'
import { AccountWrap, Content, LetterIcon, HiperLink, AppDown, ErrorMsg } from '../components/account'

const Signup = () => {
  const nameRef = useRef('')
  const userNameRef = useRef('')
  const passwordRef = useRef('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      name: nameRef.current.value,
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
    }

    axios
      .post('/api/user/signup', data)
      .then(r => Promise.resolve(r.data))
      .then(() => Router.push('/signin'))
      .catch(err => setErrorMsg(err.response.data.msg))
  }

  return (
    <AccountWrap>
      <Content>
        <div className="box">
          <LetterIcon />
          <Title>친구들의 사진과 동영상을 보려면 가입하세요.</Title>
          <form onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="성명" ref={nameRef} required />
            <input name="userName" type="text" placeholder="사용자 이름" ref={userNameRef} required />
            <input name="password" type="password" placeholder="비밀번호" ref={passwordRef} required />
            <button type="submit">가입</button>
          </form>
          {errorMsg ? (
            <ErrorMsg>{errorMsg}</ErrorMsg>
          ) : (
            <Policy>가입하면 Instagram의 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.</Policy>
          )}
        </div>
        <div className="box">
          <HiperLink adress="/signin" isAccount />
        </div>
        <AppDown />
      </Content>
    </AccountWrap>
  )
}

Signup.getInitialProps = async context => {
  const { isServer, req, res } = context
  if (isServer && req.headers.cookie) {
    res.writeHead(301, { Location: '/' })
    res.end()
  }
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
