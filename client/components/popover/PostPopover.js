import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { PopoverWrap } from './PopoverStyle'
import PostTemplate from '../post/PostTemplate'
import { NextButton, PrevButton } from '../Icons'

const UserPostPopover = () => {
  const { isPostPopover } = useSelector(state => state.popover)

  if (!isPostPopover) return null
  return (
    <PopoverWrap>
      <ArrowButtonWrap>
        <PrevButton />
      </ArrowButtonWrap>
      <PostTemplate />
      <ArrowButtonWrap>
        <NextButton />
      </ArrowButtonWrap>
    </PopoverWrap>
  )
}

const ArrowButtonWrap = styled.div`
  position: relative;
  width: 4rem;
  height: 4rem;
`

export default UserPostPopover
