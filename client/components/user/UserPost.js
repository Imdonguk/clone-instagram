import React from 'react'
import styled from 'styled-components'

const UserPost = ({ images }) => {
  return (
    <Wrap>
      <img src={`http://localhost:3065/${images[0].src}`} alt="게시물이미지" />
      <div className="woogieboogie"></div>
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  height: 29.3rem;
  cursor: pointer;
  & > img {
    width: 100%;
    height: 100%;
  }
`

export default UserPost
