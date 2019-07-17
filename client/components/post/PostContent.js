import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const PostContent = ({ img }) => {
  return (
    <Wrap>
      <img src={img} alt="게시물이미지" />
    </Wrap>
  )
}

PostContent.propTypes = {
  img: PropTypes.string.isRequired,
}

const Wrap = styled.div`
  & > img {
    width: 100%;
  }
`

export default PostContent
