import React from 'react'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import Layout from '../components/layout'
import { PostTemplate } from '../components/post'
import { LOAD_POST_REQUEST, LOAD_COMMENTS_REQUEST } from '../reducers/post'
import { CancleFollow, UserListPopover } from '../components/popover'

const Post = () => {
  const { post } = useSelector(state => state.post)
  return (
    <>
      <Helmet
        title={`${post.id && post.user.userName}님의 글`}
        description={post.id && post.description}
        meta={[
          {
            name: 'description',
            content: post.id && post.description,
          },
          {
            property: 'og:title',
            content: `${post.id && post.user.userName}님의 게시글`,
          },
          {
            property: 'og:description',
            content: post.id && post.description,
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
      <UserListPopover />
    </>
  )
}

Post.getInitialProps = async context => {
  const postState = context.store.getState()
  if (postState.post.post.id && postState.post.post.id === +context.query.id) return null

  await new Promise((resolve, reject) =>
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      postId: context.query.id,
      promise: { resolve, reject },
    }),
  )

  await new Promise((resolve, reject) =>
    context.store.dispatch({
      type: LOAD_COMMENTS_REQUEST,
      data: context.query.id,
      promise: { resolve, reject },
    }),
  )
}

export default Post
