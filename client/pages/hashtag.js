import React from 'react'
import Helmet from 'react-helmet'
import AppLayout from '../components/layout'
import HashtagTemplate from '../components/hashtag/HashtagTemplae'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post'

const Hashtag = ({ tag }) => {
  return (
    <AppLayout>
      <Helmet
        title={`#${tag} 해시태그 • Instagram 사진 및 동영상`}
        meta={[
          {
            name: 'og:title',
            content: `#${tag} 해시태그`,
          },
          {
            name: 'og:description',
            content: `#${tag} 해시태그`,
          },
        ]}
      />
      <HashtagTemplate />
    </AppLayout>
  )
}

Hashtag.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_HASHTAG_POSTS_REQUEST,
    data: context.query.tag,
  })

  return { tag: context.query.tag }
}

export default Hashtag
