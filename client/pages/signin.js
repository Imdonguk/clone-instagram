import React from 'react'
import { AccountWrap, Content, LetterIcon, HiperLink, AppDown } from '../components/account'

const Signin = () => {
  return (
    <AccountWrap>
      <Content>
        <div className="box">
          <LetterIcon />
          <form>
            <input type="text" name="userName" placeholder="사용자이름" required />
            <input type="password" name="password" placeholder="패스워드" required />
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
