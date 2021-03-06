import React, { useMemo, useCallback, memo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Router from 'next/router'
import Link from 'next/link'
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../reducers/post'
import { SAVE_OTHER_POST_REQUEST, REMOVE_SAVED_POST_REQUEST } from '../../reducers/user'
import { LikeIcon, CommentIcon, SaveIcon, ShareIcon } from '../Icons'

const PostIcons = memo(({ postId, likers }) => {
  const dispatch = useDispatch()
  const { id: userId, saved } = useSelector(state => state.user.me)
  const isLogged = useMemo(() => userId, [userId])
  const isLiked = likers && useMemo(() => !!likers.find(v => v.id === userId), [likers])
  const isSaved = saved && useMemo(() => saved.find(v => v.id === postId), [saved])

  const handleClickLikeBtn = useCallback(async () => {
    if (!isLogged) return Router.push('/signin')
    if (isLiked) {
      dispatch({
        type: UNLIKE_POST_REQUEST,
        data: postId,
      })
    } else {
      dispatch({
        type: LIKE_POST_REQUEST,
        data: postId,
      })
    }
  }, [isLiked])

  const handleClickSaveBtn = useCallback(() => {
    if (!isLogged) return Router.push('/signin')
    if (isSaved) {
      dispatch({
        type: REMOVE_SAVED_POST_REQUEST,
        data: postId,
      })
    } else {
      dispatch({
        type: SAVE_OTHER_POST_REQUEST,
        data: postId,
      })
    }
  }, [isLogged, isSaved, postId])
  return (
    <Wrap>
      <IconWrap first>
        <LikeIcon like={isLiked} onClick={handleClickLikeBtn} />
      </IconWrap>
      <Link href={{ pathname: '/post', query: { id: postId } }} as={`/post/${postId}`}>
        <a>
          <IconWrap>
            <CommentIcon />
          </IconWrap>
        </a>
      </Link>
      <IconWrap>
        <ShareIcon />
      </IconWrap>
      <IconWrap last>
        <SaveIcon save={isSaved} onClick={handleClickSaveBtn} />
      </IconWrap>
    </Wrap>
  )
})

const Wrap = styled.div`
  margin-top: 0.4rem;
  display: flex;
`

const IconWrap = styled.div`
  display: flex;
  width: 4rem;
  height: 4rem;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.first ? '-0.8rem' : props.last ? 'auto' : '0')};
  margin-right: ${props => (props.last ? '-1rem' : '0')};
`

export default PostIcons
