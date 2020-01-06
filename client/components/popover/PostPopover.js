import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap } from './PopoverStyle'
import PostTemplate from '../post/PostTemplate'
import { NextButton, PrevButton } from '../Icons'
import {
  LOAD_POST_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_COMMENTS_REQUEST,
} from '../../reducers/post'

const UserPostPopover = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { isPostPopover } = useSelector(state => state.popover)
  const hasMorePost = useSelector(state => state.post.hasMorePost)
  const posts =
    router.pathname === '/user'
      ? useSelector(state => state.post.userPosts)
      : useSelector(state => state.post.hashtagPosts)

  const postId = useSelector(state => state.post.post.id)
  const currentPostIndex = posts.findIndex(v => v.id === postId)
  const isPrevPost = useMemo(() => posts[currentPostIndex - 1], [postId])
  const isNextPost = useMemo(() => posts[currentPostIndex + 1] || hasMorePost, [postId])

  useEffect(() => {
    const isLastId = posts[posts.length - 1] && posts[posts.length - 1].id === postId
    if (isLastId && hasMorePost) {
      const type = router.pathname === '/user' ? LOAD_USER_POSTS_REQUEST : LOAD_HASHTAG_POSTS_REQUEST
      dispatch({
        type,
        data: router.query,
        lastId: postId,
      })
    }
  }, [postId])

  const handleClickNextButton = async () => {
    if (isNextPost) {
      const nextPostId = posts[currentPostIndex + 1].id
      await new Promise((resolve, reject) =>
        dispatch({
          type: LOAD_POST_REQUEST,
          postId: nextPostId,
          promise: { resolve, reject },
        }),
      )

      await new Promise((resolve, reject) =>
        dispatch({
          type: LOAD_COMMENTS_REQUEST,
          postId: nextPostId,
          promise: { resolve, reject },
        }),
      )
    }
  }

  const handleClickPrevButton = async () => {
    if (isPrevPost) {
      const prevPostId = posts[currentPostIndex - 1].id
      await new Promise((resolve, reject) =>
        dispatch({
          type: LOAD_POST_REQUEST,
          postId: prevPostId,
          promise: { resolve, reject },
        }),
      )

      await new Promise((resolve, reject) =>
        dispatch({
          type: LOAD_COMMENTS_REQUEST,
          postId: prevPostId,
          promise: { resolve, reject },
        }),
      )
    }
  }

  if (!isPostPopover) return null
  return (
    <PopoverWrap>
      <ArrowButtonWrap>{isPrevPost && <PrevButton onClick={handleClickPrevButton} />}</ArrowButtonWrap>
      <PostTemplate />
      <ArrowButtonWrap>{isNextPost && <NextButton onClick={handleClickNextButton} />}</ArrowButtonWrap>
    </PopoverWrap>
  )
}

const ArrowButtonWrap = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
`

export default UserPostPopover
