import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import imageUploadIcon from '../../images/gallery-icon.png'
import { CLOSE_POST_FORM } from '../../reducers/user'
import { ADD_POST } from '../../reducers/post'

const PostForm = () => {
  const dispatch = useDispatch()
  const cancleForm = e => {
    if (e && e.currentTarget !== e.target) return
    dispatch({ type: CLOSE_POST_FORM })
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch({
      type: ADD_POST,
    })
    cancleForm(e)
  }
  return (
    <Wrap onClick={cancleForm}>
      <Form onSubmit={handleSubmit}>
        <ContentWrap header>
          <h2>새로운 게시물</h2>
        </ContentWrap>
        <ContentWrap container>
          <ImageUpload>
            <img src={imageUploadIcon} alt="이미지업로드아이콘" />
            <p>이미지업로드</p>
            <input type="file" />
          </ImageUpload>
          <RichText placeholder="설명입력...." />
        </ContentWrap>
        <ContentWrap bottom>
          <Button onClick={cancleForm}>닫기</Button>
          <Button type="submit">업로드</Button>
        </ContentWrap>
      </Form>
    </Wrap>
  )
}

export const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #00000050;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

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

const RichText = styled.textarea`
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