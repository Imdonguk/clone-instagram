import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { PostHeader, PostContent, PostPageCommentList, PostIcons, PostLikeCount, PostInputForm } from './index'

const PostTemplate = () => {
  const { post } = useSelector(state => state.post)
  return (
    <Wrap>
      <PostContentWrap>
        <PostContent img={post.images} />
      </PostContentWrap>
      <PostRightLayout>
        <PostHeaderWrap>
          <PostHeader user={post.user} />
        </PostHeaderWrap>
        <PostCommentListWrap>
          <PostPageCommentList user={post.user} comments={post.comments} description={post.description} />
        </PostCommentListWrap>
        <PostIcons postId={post.id} likers={post.likers} />
        <PostLikeCount likers={post.likers} />
        <PostInputForm postId={post.id} />
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
