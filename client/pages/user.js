import React, { useEffect, useRef } from 'react'
import Helmet from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import AppLayout from '../components/layout'
import { EditProfileImage, EditAccount, CancleFollow } from '../components/popover'
import UserTemplate from '../components/user/UserTemplate'
import { LOAD_OTHER_USER_REQUEST, LOAD_OTHER_USER_SUCCESS } from '../reducers/user'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'

const User = ({ userName }) => {
  const dispatch = useDispatch()
  const countRef = useRef([])
  const { userInfo, me, isLoddingOwner } = useSelector(state => state.user)
  const { userPosts, hasMorePost } = useSelector(state => state.post)

  const handleScrollUserPage = () => {
    if (window.scrollY + document.documentElement.clientHeight < document.documentElement.scrollHeight - 100) return
    if (!hasMorePost) return

    const lastId = userPosts[userPosts.length - 1] && userPosts[userPosts.length - 1].id
    if (countRef.current.includes(lastId)) return
    dispatch({
      type: LOAD_USER_POSTS_REQUEST,
      data: userName,
      lastId,
    })
    countRef.current.push(lastId)
  }

  useEffect(() => {
    hasMorePost && window.addEventListener('scroll', handleScrollUserPage)
    return () => {
      window.removeEventListener('scroll', handleScrollUserPage)
    }
  }, [userPosts.length, hasMorePost])

  if (isLoddingOwner) return null
  return (
    <>
      <AppLayout>
        <Helmet
          title={`${userInfo.name} (${userInfo.userName})`}
          meta={[
            {
              name: 'og:title',
              content: `${userInfo.name} (${userInfo.userName})`,
            },
            {
              name: 'og:description',
              content: `${userInfo.userName}의 instagram`,
            },
          ]}
        />
        <UserTemplate />
      </AppLayout>
      {me.userName && <EditProfileImage />}
      <EditAccount />
      <CancleFollow />
    </>
  )
}

User.getInitialProps = async context => {
  const { me } = context.store.getState().user

  if (me.userName === context.query.userName) {
    context.store.dispatch({
      type: LOAD_OTHER_USER_SUCCESS,
      data: me,
    })
  } else {
    context.store.dispatch({
      type: LOAD_OTHER_USER_REQUEST,
      data: context.query.userName,
    })
  }

  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.query.userName,
  })
  return { userName: context.query.userName }
}
export default User
