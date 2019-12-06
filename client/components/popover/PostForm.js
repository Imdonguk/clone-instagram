import React, { useRef } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import imageUploadIcon from '../../images/gallery-icon.png'
import PreviewImg from './PreviewImg'
import { PopoverWrap } from './PopoverStyle'
import { CLOSE_POP_OVER } from '../../reducers/popover'
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE_REQUEST } from '../../reducers/post'

const PostForm = () => {
  const dispatch = useDispatch()
  const imagePaths = useSelector(state => state.post.imagePaths)
  const isPostForm = useSelector(state => state.popover.isPostForm)
  const descriptionRef = useRef('')

  const cancleForm = e => {
    if (e && e.currentTarget !== e.target) return
    dispatch({ type: CLOSE_POP_OVER })
  }
  const handleSubmit = async e => {
    try {
      e.preventDefault()
      const description = descriptionRef.current.value
      const formData = new FormData()

      imagePaths.forEach(v => formData.append('image', v))
      formData.append('description', description)
      dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      })
      cancleForm(e)
    } catch (error) {
      console.error(error)
    }
  }
  const handleChangeImages = e => {
    const imageFormData = new FormData()
    Array.from(e.target.files).forEach(f => imageFormData.append('image', f))

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })
  }

  const handleClickCancleBtn = () => {
    if (imagePaths.length > 0) {
      dispatch({
        type: REMOVE_IMAGE_REQUEST,
        data: imagePaths,
      })
    }
    cancleForm()
  }

  if (!isPostForm) return null
  return (
    <PopoverWrap>
      <Form encType="multipart/form-data" onSubmit={handleSubmit}>
        <ContentWrap header>
          <h2>새로운 게시물</h2>
        </ContentWrap>
        <ContentWrap container>
          <ImageUpload>
            <img src={imageUploadIcon} alt="이미지업로드아이콘" />
            <p>이미지업로드</p>
            <input type="file" multiple onChange={handleChangeImages} />
          </ImageUpload>
          <InputDescription placeholder="설명입력...." ref={descriptionRef} />
        </ContentWrap>
        <ContentWrap bottom>
          <Button type="button" onClick={handleClickCancleBtn}>
            닫기
          </Button>
          <Button type="submit">업로드</Button>
        </ContentWrap>
      </Form>
      <PreviewImg />
    </PopoverWrap>
  )
}

const Form = styled.form`
  width: 50rem;
  height: 30rem;
  border-radius: 2rem;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ContentWrap = styled.div`
  width: 100%;
  height: ${props => (props.container ? '60%' : '20%')};
  border-bottom: ${props => (props.bottom ? 0 : '0.1rem solid #eee')};
  padding: ${props => (props.container ? '3rem 3rem' : '0 3rem')};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: ${props => (props.bottom ? 'space-between' : 'center')};
  font-size: ${props => (props.header ? '2rem' : 0)};
  border-top-left-radius: ${props => (props.header ? '3rem' : 0)};
  border-top-right-radius: ${props => (props.header ? '3rem' : 0)};
  border-bottom-left-radius: ${props => (props.bottom ? '3rem' : 0)};
  border-bottom-right-radius: ${props => (props.bottom ? '3rem' : 0)};
`

const InputDescription = styled.textarea`
  flex: 2;
  height: 100%;
  border: 0;
  padding: 1rem;
  font-size: 1.4rem;
  outline: none;
  resize: none;
`

const Button = styled.button`
  width: 5rem;
  height: 3rem;
  background-color: #999;
  cursor: pointer;
  color: #fff;
`

const ImageUpload = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  background-color: #fff;
  text-align: center;

  & > img {
    width: 80%;
    cursor: pointer;
  }

  & > p {
    font-size: 1.4rem;
    color: #bbb;
  }

  & > input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`
export default PostForm
