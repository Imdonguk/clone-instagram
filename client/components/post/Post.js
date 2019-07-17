import React from 'react'
import styled from 'styled-components'
import { PostHeader, PostContent, PostFooter } from './index'

const dummy = {
  user: {
    name: 'woogie___boogie',
    profileImage:
      'https://scontent-gmp1-1.cdninstagram.com/vp/ea9c40f09035f1cee4f38ba78b3eb53b/5DB404A0/t51.2885-19/s150x150/66176870_271319490398976_1560280448049872896_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
    nickName: '덩욱',
  },
  followers: [],
  followings: [],
  posts: [
    {
      User: {
        id: 1,
        nickName: '',
        profileImage: '',
      },
      content: '첫번째 게시글',
      img:
        'https://scontent-gmp1-1.cdninstagram.com/vp/ab46ee91de6072677cf778369bafb2ef/5DA7AB18/t51.2885-15/sh0.08/e35/s640x640/66225780_887219248307464_8401340624033933855_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com',
      likeUserList: [],
    },
  ],
}

const Post = () => {
  return (
    <Wrap>
      <PostHeader user={dummy.user} />
      <PostContent img={dummy.posts[0].img} />
      <PostFooter />
      <Setting />
    </Wrap>
  )
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 6rem;
  border: 0.1rem solid #e6e6e6;
  background-color: #fff;
`

const Setting = styled.div``

export default Post
