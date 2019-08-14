import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { AccountWrap, Content, LetterIcon, HiperLink, AppDown } from '../components/account'
import { SIGN_IN_REQUEST } from '../reducers/user'

const Signin = () => {
  const userNameRef = useRef('')
  const passwordRef = useRef('')
  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    const data = {
      userName: userNameRef.current.value,
      password: passwordRef.current.value,
    }
    dispatch({
      type: SIGN_IN_REQUEST,
      data,
    })
  }
  return (
    <AccountWrap>
      <Content>
        <div className="box">
          <LetterIcon />
          <form onSubmit={handleSubmit}>
            <input type="text" name="userName" placeholder="사용자이름" ref={userNameRef} required />
            <input type="password" name="password" placeholder="패스워드" ref={passwordRef} required />
            <button className="content-form-button" type="submit">
              로그인
            </button>
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
