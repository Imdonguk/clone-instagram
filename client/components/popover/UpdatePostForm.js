import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { PopoverWrap } from './PopoverStyle'
import { Form, ContentWrap, InputDescription, Button } from './PostForm'
import { UPDATE_POST_REQUEST } from '../../reducers/post'
import { CLOSE_UPDATE_POST_FORM } from '../../reducers/popover'

const UpdatePostForm = () => {
  const { isUpdatePostForm, updatePostData } = useSelector(state => state.popover)

  const descriptionRef = useRef('')
  const dispatch = useDispatch()

  const cancleForm = e => {
    if (e && e.currentTarget !== e.target) return
    dispatch({ type: CLOSE_UPDATE_POST_FORM })
  }
  const handleSubmit = e => {
    e.preventDefault()
    const description = descriptionRef.current.value
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: { description },
      postId: updatePostData && updatePostData.id,
    })

    cancleForm(e)
  }

  if (!isUpdatePostForm) return null
  return (
    <PopoverWrap>
      <Form onSubmit={handleSubmit}>
        <ContentWrap header>
          <h2>게시물 수정</h2>
        </ContentWrap>
        <ContentWrap container>
          <PreviewImageWrap>
            <img src={updatePostData && updatePostData.images[0].src} alt="게시물이미지" />
          </PreviewImageWrap>
          <InputDescription placeholder={updatePostData && updatePostData.description} ref={descriptionRef} />
        </ContentWrap>
        <ContentWrap bottom>
          <Button type="button" onClick={cancleForm}>
            닫기
          </Button>
          <Button type="submit">업로드</Button>
        </ContentWrap>
      </Form>
    </PopoverWrap>
  )
}

const PreviewImageWrap = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  background-color: #fff;
  text-align: center;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export default UpdatePostForm
