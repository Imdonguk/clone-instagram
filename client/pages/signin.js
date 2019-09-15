import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
import axios from 'axios'
import Helmet from 'react-helmet'
import { AccountWrap, Content, LetterIcon, HiperLink, AppDown, ErrorMsg } from '../components/account'
import { SIGN_IN } from '../reducers/user'

const Signin = () => {
  const userNameRef = useRef('')
  const passwordRef = useRef('')
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
    }
    axios
      .post('/signin', data, {
        withCredentials: true,
      })
      .then(r => Promise.resolve(r.data))
      .then(r => {
        if (!r.success) return setErrorMsg(r.msg)
        dispatch({ type: SIGN_IN })
      })
      .then(() => Router.push('/'))
      .catch(() => {})
  }

  return (
    <AccountWrap>
      <Helmet
        title="로그인 clone-instagram"
        meta={[
          {
            name: 'og:title',
            content: '로그인페이지',
          },
          {
            name: 'og:description',
            content: '로그인하고 친구들과 사진과 동영상을 공유해보세요',
          },
        ]}
      />
      <Content>
        <div className="box">
          <LetterIcon />
          <form onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder="사용자이름" ref={userNameRef} required />
            <input type="password" name="password" placeholder="패스워드" ref={passwordRef} required />
            <button className="content-form-button" type="submit">
              로그인
            </button>
            {errorMsg ? <ErrorMsg>{errorMsg}</ErrorMsg> : ''}
          </form>
        </div>
        <div className="box">
          <HiperLink adress="/signup" isAccount={false} />
        </div>
        <AppDown />
      </Content>
    </AccountWrap>
  )
}

export default Signin
