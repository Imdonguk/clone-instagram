import React from 'react'
import { useSelector } from 'react-redux'
import { PopoverWrap } from './PopoverStyle'
import UserList from '../user/UserList'
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_LIKERS_REQUEST } from '../../reducers/user'

const UserListPopover = () => {
  const { isUserList, title, userListData } = useSelector(state => state.popover)
  const result = {
    팔로워: {
      title,
      userListData,
      action: LOAD_FOLLOWERS_REQUEST,
    },
    팔로잉: {
      title,
      userListData,
      action: LOAD_FOLLOWINGS_REQUEST,
    },
    좋아요: {
      title,
      userListData,
      action: LOAD_LIKERS_REQUEST,
    },
  }
  if (!isUserList) return null
  return (
    <PopoverWrap>
      <UserList title={result[title].title} action={result[title].action} data={result[title].data} />
    </PopoverWrap>
  )
}

export default UserListPopover
