import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Post, PostForm, PostSetting } from './post'

const Container = () => {
  const { posts, isPostSetting } = useSelector(state => state.post)
  const isPostForm = useSelector(state => state.user.isPostForm)
  return (
    <Wrapper>
      <div className="container">
        <div className="left">
          {posts.map(v => (
            <Post key={v.id.toString()} info={v} />
          ))}
          {isPostForm && <PostForm />}
          {isPostSetting && <PostSetting />}
        </div>
        <div className="right">
          <div className="woogie">ㅎㅎ</div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  min-height: 100vh;
  & > .container {
    position: relative;
    display: grid;
    grid-template-columns: 61.4rem 1fr;
    margin: 13.7rem auto 0 auto;
    max-width: 93.5rem;
    min-height: 100%;
    grid-gap: 2.8rem;
  }
`

export default Container
