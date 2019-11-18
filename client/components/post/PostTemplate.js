import React from 'react'
import styled from 'styled-components'
import { PostHeader, PostContent, PostPageCommentList, PostIcons, PostLikeCount, PostInputForm } from './index'

const dummyData = {
  user: {
    userName: 'woogieboogie',
    name: '우기부기',
    image: {
      src: 'IMG_24531573541982446.jpg',
    },
  },

  images: [{ id: 1, src: 'IMG_24531573541982446.jpg' }],
  description: '하이욱!',
  id: 1,
  likers: [1, 2, 3],
}
const PostTemplate = () => {
  return (
    <Wrap>
      <PostContentWrap>
        <PostContent img={dummyData.images} />
      </PostContentWrap>
      <PostRightLayout>
        <PostHeaderWrap>
          <PostHeader user={dummyData.user} />
        </PostHeaderWrap>
        <PostCommentListWrap>
          <PostPageCommentList user={dummyData.user} comments={[]} description={dummyData.description} />
        </PostCommentListWrap>
        <PostIcons postId={dummyData.id} likers={dummyData.likers} />
        <PostLikeCount likers={dummyData.likers} />
        <PostInputForm postId={dummyData.id} />
      </PostRightLayout>
    </Wrap>
  )
}

const Wrap = styled.div`
  margin: 4rem 0;
  display: flex;
  height: 60rem;

  border: 0.1rem solid #e6e6e6;
`

const PostContentWrap = styled.div`
  width: 60rem;
  height: inherit;
`

const PostRightLayout = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: inherit;
  background-color: #fff;
  padding: 0 1.6rem;
  border-left: 0.1rem solid #e6e6e6;
`

const PostHeaderWrap = styled.div`
  padding: 1.6rem 0;
  border-bottom: 0.1rem solid #e6e6e6;
`

const PostCommentListWrap = styled.div`
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default PostTemplate
