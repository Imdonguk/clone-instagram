import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { REMOVE_IMAGE_REQUEST } from '../../reducers/post'

const PreviewImg = () => {
  const { imagePaths } = useSelector(state => state.post)
  const dispatch = useDispatch()
  const handleDeletePreviewImg = (index, value) => () => {
    dispatch({
      type: REMOVE_IMAGE_REQUEST,
      data: value,
    })
  }
  return (
    <Wrap>
      {imagePaths &&
        imagePaths.map((v, i) => (
          <div>
            <img src={`http://localhost:3065/${v}`} alt="preview" />
            <button type="button" onClick={handleDeletePreviewImg(i, v)}>
              제거
            </button>
          </div>
        ))}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;

  & > div {
    position: relative;
  }

  & img {
    width: 20rem;
    height: 20rem;
    border: 1rem solid #fff;
  }
  & button {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }
`

export default PreviewImg
