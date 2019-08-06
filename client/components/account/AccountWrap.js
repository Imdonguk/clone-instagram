import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

const AccountWrap = ({ children }) => {
  return (
    <Wrap>
      <div className="main">
        <div className="main-inner">{children}</div>
      </div>
      <Footer />
    </Wrap>
  )
}

const Wrap = styled.div`
  min-width: 93.5rem;
  position: relative;
  background: #fafafa;

  .main {
    height: 71.7rem;
    padding-bottom: 4.4rem;
    box-sizing: border-box;

    &-inner {
      max-width: 93.5rem;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
    }
  }
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 35rem;
  width: 100%;
  margin-top: 12px;
  color: #262626;

  .error {
    color: #eb4022;
  }

  .box {
    padding: 1rem 0;
    margin-bottom: 1rem;
    background: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 1px;
  }

  form {
    padding: 0 4rem;
    margin-bottom: 1rem;

    input {
      width: 100%;
      height: 4rem;
      margin-bottom: 1rem;
      padding: 0.5rem 1.5rem;
      border: 0.1rem solid #e6e6e6;
      color: #666;
      font-size: inherit;
      border-radius: 0.2rem;
      background: #fafafa;
      box-sizing: border-box;

      &::placeholder {
        color: #999;
      }
    }
    button {
      width: 100%;
      height: 3.2rem;
      padding: 0.5rem 0.9rem;
      border-radius: 0.4rem;
      background: #3897f0;
      border: 0.1rem solid #3897f0;
      color: #fff;
      outline: none;
      cursor: pointer;
      font-size: inherit;
      font-weight: 600;

      &:active {
        opacity: 0.5;
      }
    }
  }
`

export default AccountWrap
export { Content }
