import React from 'react'
import Layout from '../components/layout'
import { PostTemplate } from '../components/post'
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_COMMENTS_REQUEST } from '../reducers/post'

const Post = () => {
  return (
    <Layout>
      <PostTemplate />
    </Layout>
  )
}

Post.getInitialProps = async context => {
  const postState = context.store.getState()
  if (postState.post.post.id && postState.post.post.id === +context.query.id) return null
  const post =
    postState.post.posts.find(v => v.id === +context.query.id) ||
    postState.post.hashtagPosts.find(v => v.id === +context.query.id) ||
    postState.post.userPosts.find(v => v.id === +context.query.id) ||
    false

  if (post) {
    context.store.dispatch({ type: LOAD_POST_SUCCESS, data: post })
  } else {
    await new Promise((resolve, reject) =>
      context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.query.id,
        promise: { resolve, reject },
      }),
    )
  }

  await new Promise((resolve, reject) =>
    context.store.dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: context.query.id,
      promise: { resolve, reject },
    }),
  )
}

export default Post
