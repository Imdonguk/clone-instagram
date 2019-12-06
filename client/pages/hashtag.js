import React, { useEffect, useRef, useCallback } from 'react'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../components/layout'
import HashtagTemplate from '../components/hashtag/HashtagTemplae'
import { LOAD_HASHTAG_POSTS_REQUEST } from '../reducers/post'

const Hashtag = ({ tag }) => {
  const dispatch = useDispatch()
  const countRef = useRef([])
  const { hashtagPosts, hasMorePost } = useSelector(state => state.post)
  const handleScrollHashtagPage = useCallback(() => {
    if (window.scrollY + document.documentElement.clientHeight < document.documentElement.scrollHeight - 100) return
    if (!hasMorePost) return

    const lastId = hashtagPosts[hashtagPosts.length - 1] && hashtagPosts[hashtagPosts.length - 1].id
    if (countRef.current.includes(lastId)) return

    dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: tag,
      lastId,
    })
    countRef.current.push(lastId)
  }, [hashtagPosts.length, hasMorePost])

  useEffect(() => {
    hasMorePost && window.addEventListener('scroll', handleScrollHashtagPage)
    return () => {
      window.removeEventListener('scroll', handleScrollHashtagPage)
    }
  }, [hashtagPosts.length, hasMorePost])
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
