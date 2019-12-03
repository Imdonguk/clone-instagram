import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { PostHeader, PostContent, PostPageCommentList, PostIcons, PostLikeCount, PostInputForm } from './index'

const PostTemplate = () => {
  const { post } = useSelector(state => state.post)
  return (
    <Wrap>
      <PostContentWrap>
        <PostContent images={post.images} />
      </PostContentWrap>
      <PostRightLayout>
        <PostHeaderWrap>
          <PostHeader user={post.user} />
        </PostHeaderWrap>
        <PostCommentListWrap>
          <PostPageCommentList />
        </PostCommentListWrap>
        <PostIcons postId={post.id} likers={post.likers} />
        <PostLikeCount likers={post.likers} />
        <PostInputForm postId={post.id} />
      </PostRightLayout>
    </Wrap>
  )
}

const Wrap = styled.div`
  background-color: #fff;
  width: 93.5rem;
  margin-top: 4rem;
  margin-bottom: 6rem;
  display: flex;
  max-height: 61.4rem;
`

const PostContentWrap = styled.div`
  width: 60rem;
  height: inherit;
  display: flex;
  align-items: center;
  border: 0.1rem solid #e6e6e6;
  border-right: 0;
`

const PostRightLayout = styled.div`
  min-height: 45rem;
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  height: inherit;
  background-color: #fff;
  padding: 0 1.6rem;
  border: 0.1rem solid #e6e6e6;
`

const PostHeaderWrap = styled.div`
  padding: 1.6rem 0;
  border-bottom: 0.1rem solid #e6e6e6;
`

const PostCommentListWrap = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export default PostTemplate
