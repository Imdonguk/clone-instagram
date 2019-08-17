import React from 'react'

const hashtag = ({ tag }) => {
  return <div>해쉬태그 페이지!! {tag}</div>
}

hashtag.getInitialProps = async context => {
  return { tag: context.query.tag }
}

export default hashtag
