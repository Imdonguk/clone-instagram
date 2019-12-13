import React from 'react'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import Layout from '../components/layout'
import { PostTemplate } from '../components/post'
import { LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_COMMENTS_REQUEST } from '../reducers/post'
import { CancleFollow } from '../components/popover'

const Post = () => {
  const { post } = useSelector(state => state.post)
  return (
    <>
      <Helmet
        title={`${post.id && post.post.userName}님의 글`}
        description={post.description}
        meta={[
          {
            name: 'description',
            content: post.description,
          },
          {
            property: 'og:title',
            content: `${post.user.userName}님의 게시글`,
          },
          {
            property: 'og:description',
            content: post.description,
          },
          {
            property: 'og:image',
            content: post.images[0] ? post.images[0].src : 'https://woogiegram.com/favicon.ico',
          },
          {
            property: 'og:url',
            content: `https://woogiegram.com/post/${post.id}`,
          },
        ]}
      />
      <Layout>
        <PostTemplate />
      </Layout>
      <CancleFollow />
    </>
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
