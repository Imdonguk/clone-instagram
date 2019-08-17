import React from 'react'

const user = ({ userName }) => {
  return <>유저페이지 {userName}</>
}

user.getInitialProps = async context => {
  console.log(`userName is ${context.query.userName}`)
  return { userName: context.query.userName }
}
export default user
