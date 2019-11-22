import React from 'react'
import Layout from '../components/layout'
import { PostTemplate } from '../components/post'
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS } from '../reducers/post'

const Post = () => {
  return (
    <Layout>
      <PostTemplate />
    </Layout>
  )
}

Post.getInitialProps = async context => {
  const postState = context.store.getState()
  const post =
    postState.post.posts.find(v => v.id === +context.query.id) ||
    postState.post.hashtagPosts.find(v => v.id === +context.query.id) ||
    postState.post.userPosts.find(v => v.id === +context.query.id) ||
    false

  if (post) {
    context.store.dispatch({
      type: LOAD_POST_SUCCESS,
      data: post,
    })
    return
  }

  await new Promise((resolve, reject) =>
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.query.id,
      promise: { resolve, reject },
    }),
  )
}

export default Post
