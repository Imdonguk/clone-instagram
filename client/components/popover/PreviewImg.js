import React, { memo } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { REMOVE_IMAGE_REQUEST } from '../../reducers/post'

const PreviewImg = memo(() => {
  const { imagePaths } = useSelector(state => state.post)
  return <Wrap>{imagePaths && imagePaths.slice(1).map(v => <PreviewImageComponent src={v} key={v} />)}</Wrap>
})

const PreviewImageComponent = memo(({ src }) => {
  const dispatch = useDispatch()
  const handleDeletePreviewImg = value => () => {
    dispatch({
      type: REMOVE_IMAGE_REQUEST,
      data: value,
    })
  }
  return (
    <div>
      <img src={src} alt="preview" />
      <button type="button" onClick={handleDeletePreviewImg(src)}>
        제거
      </button>
    </div>
  )
})

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
