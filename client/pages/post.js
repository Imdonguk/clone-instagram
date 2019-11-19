import React from 'react'
import Layout from '../components/layout'
import { PostTemplate } from '../components/post'
import { LOAD_POST_REQUEST } from '../reducers/post'

const Post = () => {
  return (
    <Layout>
      <PostTemplate />
    </Layout>
  )
}

Post.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POST_REQUEST,
    data: context.query.id,
  })
}

export default Post
