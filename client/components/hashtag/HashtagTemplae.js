import React, { memo } from 'react'
import styled from 'styled-components'
import HashtagPosts from './HashtagPosts'

const HashtagTemplate = memo(() => {
  return (
    <Wrap>
      <HashtagPosts />
    </Wrap>
  )
})

const Wrap = styled.div`
  padding-top: 6rem;
`

export default HashtagTemplate
