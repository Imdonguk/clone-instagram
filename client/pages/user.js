import React from 'react'
import Helmet from 'react-helmet'
import { useSelector } from 'react-redux'
import AppLayout from '../components/layout'
import { EditProfileImage, EditAccount, CancleFollow } from '../components/popover'
import UserTemplate from '../components/user/UserTemplate'
import { LOAD_OTHER_USER_REQUEST } from '../reducers/user'
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post'

const User = () => {
  const { userName, name } = useSelector(state => state.user.userInfo)
  const isLodding = useSelector(state => state.user.isLoddingOwner)

  if (isLodding) return null
  return (
    <>
      <AppLayout>
        <Helmet
          title={`${name} (${userName})`}
          meta={[
            {
              name: 'og:title',
              content: `${name} (${userName})`,
            },
            {
              name: 'og:description',
              content: `${userName}의 instagram`,
            },
          ]}
        />
        <UserTemplate />
      </AppLayout>
      <EditProfileImage />
      <EditAccount />
      <CancleFollow />
    </>
  )
}

User.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_OTHER_USER_REQUEST,
    data: encodeURIComponent(context.query.userName),
  })

  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: encodeURIComponent(context.query.userName),
  })
}
export default User
