import React, { useMemo, useCallback } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap, ButtonWrap, PopoverButton } from './PopoverStyle'
import { CLOSE_EDIT_POST, OPEN_UPDATE_POST_FORM } from '../../reducers/popover'
import { REMOVE_POST_REQUEST } from '../../reducers/post'
import { SAVE_OTHER_POST_REQUEST, REMOVE_SAVED_POST_REQUEST } from '../../reducers/user'

const EditPost = () => {
  const dispatch = useDispatch()
  const { isEditPost, editPostData } = useSelector(state => state.popover)
  const { id, saved } = useSelector(state => state.user.me)
  const isOwner = id && editPostData !== undefined && id === editPostData.user.id

  const isLogged = useMemo(() => !!id, [id])
  const isSaved = isLogged && saved.length && saved.find(v => editPostData && v.id === editPostData.id)

  const handleClickSaveBtn = useCallback(() => {
    if (!isLogged) return Router.push('/signin')
    if (isSaved) {
      dispatch({
        type: REMOVE_SAVED_POST_REQUEST,
        data: editPostData.id,
      })
    } else {
      dispatch({
        type: SAVE_OTHER_POST_REQUEST,
        data: editPostData.id,
      })
    }
    dispatch({ type: CLOSE_EDIT_POST })
  }, [isLogged, isSaved, editPostData && editPostData.id])

  const handleClickRemovePost = () => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      postId: editPostData.id,
      data: editPostData.images,
    })
    dispatch({
      type: CLOSE_EDIT_POST,
    })
  }

  const handleClickUpdatePostForm = () => {
    dispatch({
      type: OPEN_UPDATE_POST_FORM,
      data: editPostData,
    })
  }

  const handleClickCancleBtn = useCallback(() => {
    dispatch({ type: CLOSE_EDIT_POST })
  }, [])
  if (!isEditPost) return null
  return (
    <PopoverWrap>
      <ButtonWrap>
        <Link href={{ pathname: '/post', query: { id: editPostData.id } }} as={`/post/${editPostData.id}`}>
          <a>
            <PopoverButton type="button" location="top">
              게시물로 이동
            </PopoverButton>
          </a>
        </Link>
        <PopoverButton type="button" onClick={handleClickSaveBtn}>
          저장하기
        </PopoverButton>
        {isOwner && (
          <PopoverButton type="button" fontColor="blue" onClick={handleClickUpdatePostForm}>
            수정하기
          </PopoverButton>
        )}
        {isOwner && (
          <PopoverButton type="button" fontColor="red" onClick={handleClickRemovePost}>
            제거하기
          </PopoverButton>
        )}
        <PopoverButton type="button" location="bottom" onClick={handleClickCancleBtn}>
          닫기
        </PopoverButton>
      </ButtonWrap>
    </PopoverWrap>
  )
}

export default EditPost
