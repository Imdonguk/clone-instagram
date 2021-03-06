import styled, { css } from 'styled-components'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_POP_OVER } from '../../reducers/popover'
import { REMOVE_IMAGE_REQUEST } from '../../reducers/post'

export const PopoverWrap = ({ children }) => {
  const imagePaths = useSelector(state => state.post.imagePaths)
  const dispatch = useDispatch()
  const canclePopover = useCallback(e => {
    if (e && e.currentTarget !== e.target) return
    if (imagePaths.length > 0) {
      dispatch({
        type: REMOVE_IMAGE_REQUEST,
        data: imagePaths,
      })
    }
    dispatch({ type: CLOSE_POP_OVER })
  }, [])

  return <Wrap onClick={canclePopover}>{children}</Wrap>
}

export const PopoverButton = ({ children, fontColor, location, onClick }) => {
  const handleClickButton = useCallback(() => {
    onClick && onClick()
  }, [])
  return (
    <Button fontColor={fontColor} location={location} onClick={handleClickButton}>
      {children}
    </Button>
  )
}

const Wrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #00000050;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const ButtonWrap = styled.div`
  width: 40rem;
`

export const Button = styled.button`
  width: 100%;
  height: 4.8rem;
  font-size: 1.4rem;
  font-weight: 700;
  outline: none;
  cursor: pointer;
  border-top: 0.1rem solid #fff;
  
  &:active {
    background-color: #eee;
  }


    ${props =>
      props.location === 'top' &&
      css`
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      `}
    ${props =>
      props.location === 'bottom' &&
      css`
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
      `}
    ${props =>
      props.fontColor === 'blue'
        ? css`
            color: #3897f0;
          `
        : props.fontColor === 'red' &&
          css`
            color: #ed4956;
          `};
`
